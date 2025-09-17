const mongoose = require("mongoose");
const { type } = require("os");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
    default: 0,
  },
  originalPrice: {
    type: Number,
    require: true,
  },
  discount: {
    type: Number,
    require: true,
    default: 0,
  },
    brand: {
    type: String,
    require: true,
  },
    image: {
    type: String,
    require: true,
  },
    description: {
    type: String,
    require: true,
  },
    inStock: {
    type: Number,
    require: true,
  },
  sold:{
    type: Number,
    // require: true,
    default: 0,
  },
  featured: {
    type: String,
    require: true,
  },
    specifications: {
    type: String,
    require: true,
  },
    rating: {
    type: Number,
    // require: true,
    default: 0,
  },
    reviews: {
    type: String,
    // require: true,
    default: "",
  },
});


module.exports = mongoose.model("product", productSchema);