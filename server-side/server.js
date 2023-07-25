const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Welcome to Nature's Call!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});