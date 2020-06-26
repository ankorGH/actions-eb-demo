const app = require("./src/app");
const Config = require("./src/config");

app.listen(Config.PORT, () => {
  console.log(`Spinned up flamer, listening to port ${Config.PORT}`);
});
