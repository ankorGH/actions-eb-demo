const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const setUpVars = (platformVars) => {
  for (let envVar in platformVars) {
    process.env[envVar] = platformVars[envVar];
  }
};

switch (process.env.NODE_ENV) {
  case "test":
    const testEnvConfig = dotenv.parse(
      fs.readFileSync(path.join(__dirname, "../.env.test"))
    );
    setUpVars(testEnvConfig);
    break;
  case "development":
  case "production":
  case "staging":
    dotenv.config();
    break;
}

module.exports = {
  PORT: process.env.PORT || 9090,
  DB_URL: process.env.DB_URL,
};
