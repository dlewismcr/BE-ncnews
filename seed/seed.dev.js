const seedDB = require("./seed");
const mongoose = require("mongoose");
const data = require("./devData");
const { DB_URL } = require("../config");

mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  .then(() => seedDB(data))
  .then(() => mongoose.disconnect());
