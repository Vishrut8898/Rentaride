const mongoose = require("mongoose");

const DetailSchema = new mongoose.Schema(
  {
    departPlace: {
      type: String,
      require: true,
    },
    departDate: {
      type: String,
      require: true,
    },
    departTime: {
      type: String,
      require: true,
    },
    returnPlace: {
      type: String,
      require: true,
    },
    returnDate: {
      type: String,
      require: true,
    },
    returnTime: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Detail = mongoose.model("detail", DetailSchema);

module.exports = Detail;
