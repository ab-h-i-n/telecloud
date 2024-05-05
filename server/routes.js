const { Api } = require("telegram");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "images/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const Routes = (client, router) => {
  router.get("/", async (req, res) => {
    try {
      res.send("Server Working Correctly!");
      await client.sendMessage("me", { message: "Server Working Correctly!" });
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.post("/upload", upload.single("file"), async (req, res) => {
    try {
      const caption = req.body.foldername;
      const entity = await client.getEntity("me");
      await client.sendFile(entity, {
        caption,
        file: req.file.path,
        forceDocument: true,
      });
      res.json({ message: "File sent" });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/allfolders", async (req, res) => {
    try {
      const entity = await client.getEntity("me");

      const messages = await client.getMessages(entity, {
        filter: Api.InputMessagesFilterDocument,
      });

      const uniqueFolders = new Set();

      messages.forEach((message) => {
        const foldername = message.message;
        uniqueFolders.add(foldername);
      });

      const folders = Array.from(uniqueFolders).map((foldername) => ({
        foldername: foldername,
      }));

      res.json(folders);
    } catch (error) {
      console.error("Error retrieving folders:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/files/:foldername", async (req, res) => {
    try {
      const { foldername } = req.params;
      const entity = await client.getEntity("me");

      const messages = await client.getMessages(entity, {
        filter: Api.InputMessagesFilterDocument,
      });

      const folderFiles = messages.filter(
        (file) => file.message === foldername
      );

      const filePromise = folderFiles.map(async (message) => {
        const buffer = await client.downloadMedia(message, {});
        return {
          fileData: buffer,
          fileName: message.media.document.attributes[1].fileName,
          fileSize: message.media.document.size,
          mimeType: message.media.document.mimeType,
          fileId: message.id,
        };
      });

      const files = await Promise.all(filePromise);

      res.json(files);
    } catch (error) {
      console.error("Error retrieving files:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.delete("/deleteFile/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const messageId = parseInt(id);

      const entity = await client.getEntity("me");
      await client.deleteMessages(entity, [messageId], { revoke: false });

      res.json({ message: "File deleted" });

    } catch (error) {
      console.error("Error deleting file:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  router.delete("/deleteFolder/:foldername", async (req, res) => {

    try {
      const { foldername } = req.params;
      const entity = await client.getEntity("me");

      const messages = await client.getMessages(entity, {
        filter: Api.InputMessagesFilterDocument,
      });

      const folderFiles = messages.filter(
        (file) => file.message === foldername
      );

      const fileIds = folderFiles.map((file) => file.id);

      await client.deleteMessages(entity, fileIds, { revoke: false });

      res.json({ message: "Folder deleted" });

    } catch (error) {
      console.error("Error deleting folder:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }

  });
};

module.exports = Routes;
