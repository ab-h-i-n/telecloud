router.post("/upload", async (req, res) => {
    const entity = await client.getEntity("me");
    const caption = "User 1";

    await client.sendFile(entity, { file: "./photo.jpg", caption });

    res.json({ message: "File sended" });
  });