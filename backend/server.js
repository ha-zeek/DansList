// Imported Packages

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const Product = require("./Model/productSchema.js");
const Cart = require("./Model/cartSchema.js");

const { PORT = 4000, DATABASE_URL } = process.env;

const app = express();

// const whitelist = ["http://localhost:3000"];

// const corsOption = {
//   origin: whitelist,
// };

// app.use(cors(corsOption))

//  MiddleWare Setup?
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Mongoose Setup Connection

mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection
  .on("open", () => console.log("You are connected to the database"))
  .on("close", () => console.log("You have disconnected from database"))
  .on("error", (error) => console.log("ERROR", error));

// ROUTES

app.get("/", (req, res) => {
  res.send("Testing Routes");
});

// Product index route
app.get("/product", async (req, res) => {
  try {
    res.json(await Product.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

// Product details Route
app.get("/product/:id", async (req, res) => {
  try {
    res.json(await Product.findById(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

// create new product to list
app.post("/product", async (req, res) => {
  try {
    res.json(await Product.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

// /////
app.get("/product/cart/items", async (req, res) => {
  try {
    res.json(await Cart.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});
// add to cartSchema
app.post("/product/cart", async (req, res) => {
  try {
    res.json(await Cart.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

app.put("/product/cart/:id", async (req, res) => {
  try {
    res.json(
      await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    res.status(400).json(error);
  }
});

// DELETE cartItems
app.delete("/product/cart/:id", async (req, res) => {
  try {
    res.json(await Cart.findByIdAndRemove(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
