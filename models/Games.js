const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    description: { type: String },
    genre: { type: String, required: true },
    platform: { type: String },
    clearance: { type: Boolean },
    img: String,
    pokemon: Boolean,
    releaseDate: { type: String },
    publisherInformation: {
      type: Schema.Types.Mixed,
    },
    rating: [
      {
        star: Number,
        postedbyUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalrating: {
      type: String,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Game", gameSchema);
