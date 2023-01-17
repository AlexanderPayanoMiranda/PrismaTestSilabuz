const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});