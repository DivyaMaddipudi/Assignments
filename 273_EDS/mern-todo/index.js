const express = require("express");
const app = express();

const port = process.env.port || 3000;

app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
