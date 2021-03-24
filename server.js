const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.static('./dist'));
app.get('*', (req, res) => res.sendFile(path.join(`${__dirname}/dist/index.html`)));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
  console.log(`http://localhost:${PORT}`);
});
