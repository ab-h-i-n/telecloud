
const { Api } = require("telegram");
const multer = require("multer");
const { log } = require("console");


const storage = multer.diskStorage({
  destination: 'images/',
  filename : ( req,file, cb) => {
    cb(null, file.originalname);
  
  }
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
      await client.sendFile(entity, { caption , file: req.file.path, forceDocument: true});
  
      res.json({ message: "File sent" });

    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  router.get("/allusers", async (req, res) => {
    try {
        const entity = await client.getEntity("me");

        const messages = await client.getMessages(entity, {
            filter: Api.InputMessagesFilterDocument,
        });

        // Use a Set to store unique usernames
        const uniqueUsers = new Set();

        // Iterate through messages to collect unique usernames
        messages.forEach((message) => {
            // Extract username from the message
            const username = message.message;
            // Add username to the set
            uniqueUsers.add(username);
        });

        // Convert Set to array
        const users = Array.from(uniqueUsers).map((username) => ({
            username: username,
        }));

        res.json(users);

    } catch (error) {
        console.error("Error downloading media:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


  router.get("/userfiles/:username", async (req, res) => {
    try {
        const username = req.params.username;
        const entity = await client.getEntity("me");

        const messages = await client.getMessages(entity, {
            filter: Api.InputMessagesFilterDocument,
        });

        const userMessages = messages.filter((message) => message.message === username);

        const file = userMessages.map((message) => ({
            fileReference: message.media.document.fileReference,
            fileName: message.media.document.attributes[1].fileName,
            fileSize: message.media.document.size,
            mimeType: message.media.document.mimeType,
        }));

        res.json(file);

    } catch (error) {
        console.error("Error downloading media:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  });

};

module.exports = Routes;
