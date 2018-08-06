const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { DB_URL } = process.envDB_URL || require("./config");
const apiRouter = require("./routes/api");

app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  if (err.status === 400)
    res.status(400).send({ msg: err.msg || "Bad request", err: err });
  if (err.status === 404)
    res.status(404).send({ msg: "Page not found", err: err });
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
