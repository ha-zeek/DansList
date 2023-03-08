const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  count: Number,
  description: String,
  seller: String,
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
