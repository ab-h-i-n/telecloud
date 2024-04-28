const { Api } = require("telegram");
const multer = require("multer");
const { log } = require("console");
const { promises } = require("fs");

const storage = multer.diskStorage({
  destination: "images/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const Routes = (client, router) => {
  router.get("/", async (req, res) => {
    res.send("Sended Hello World!");
    await client.sendMessage("me", { message: "Hello World!" });
  });

  router.post("/upload", upload.single("file"), async (req, res) => {
    try {
      const caption = req.body.username;
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

      // Convert Set to array
      const folders = Array.from(uniqueFolders).map((foldername) => ({
        foldername: foldername,
      }));

      res.json(folders);
    } catch (error) {
      console.error("Error downloading media:", error);
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
        };
      });

      const files = await Promise.all(filePromise);

      res.json(files);

    } catch (error) {
      console.error("Error downloading media:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

module.exports = Routes;
