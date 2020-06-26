const mongoose = require("mongoose");
const Config = require("./config");

const connection = mongoose.connection;

const connect = async () => {
  try {
    await mongoose.connect(Config.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.log(`error connecting to db`);
  }
};

connection.on("close", () => {
  console.log(`closing db `);
});

connection.once("open", () => {
  console.log("connected to db");
});

connect();
