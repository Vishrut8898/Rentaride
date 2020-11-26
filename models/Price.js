const mongoose = require("mongoose");

const PriceSchema = new mongoose.Schema({
  price: {
    type: String,
    require: true,
  },
});

const Price = mongoose.model("Price", PriceSchema);

module.exports = Price;
