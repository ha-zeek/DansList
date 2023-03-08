const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  count: Number,
  description: String,
  seller: String,
  qty: Number,
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
