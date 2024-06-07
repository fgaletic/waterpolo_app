const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require("./mongo/connection");

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

connectDB().then(() => console.log("Connected to database!"))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
