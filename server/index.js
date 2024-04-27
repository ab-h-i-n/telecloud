const express = require('express');
const app = express();
const { startTelegramClient, router  } = require('./telegram');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(router);

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server running at ${PORT}`);
    startTelegramClient();
})


