const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommunitySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    min: 2,
    unique: true,
  },
  population: {
    type: Number,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

const CommunityModel = mongoose.model("community", CommunitySchema);
module.exports = CommunityModel;
