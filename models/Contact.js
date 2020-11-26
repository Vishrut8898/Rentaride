const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  tel: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Mssg = mongoose.model("Mssg", ContactSchema);

module.exports = Mssg;
