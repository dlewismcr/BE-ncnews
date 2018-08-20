const app = require("./app");

const { PORT = 9090 } = process.env;
// destructures PORT from process.env (or uses 9090 as a default)

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`listening on port ${PORT}`);
});
