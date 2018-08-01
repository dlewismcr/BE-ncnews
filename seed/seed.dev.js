const seedDB = require("./seed");
const mongoose = require("mongoose");
const data = require("./testData");

mongoose
  .connect(
    "mongodb://localhost:27017/northcoders_news",
    { useNewUrlParser: true }
  )
  .then(() => seedDB(data))
  .then(() => mongoose.disconnect());
