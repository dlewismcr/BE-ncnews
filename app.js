const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { DB_URL } = require("./config");
const apiRouter = require("./routes/api");

app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  console.log(err);
  if ((err.code = "23502"))
    res
      .status(400)
      .send(
        "**See app.js Example error** Bad request, missing field from POST request"
      );
  else next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send("Internal Server Error");
});

mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  .then(() => console.log(`Connected to ${DB_URL}`));

module.exports = app;
