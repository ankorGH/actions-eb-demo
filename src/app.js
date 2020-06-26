const express = require("express");
const app = express();
const model = require("./model");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", apiRoutes);
app.get("/", (req, res) => {
  res.send("nio");
});

module.exports = app;
