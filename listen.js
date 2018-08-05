const app = require("./app");

const { PORT = 9090 } = process.env.DB_URL;

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`listening on port ${PORT}`);
});
