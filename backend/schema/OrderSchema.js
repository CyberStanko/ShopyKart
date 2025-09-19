const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: String,   
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  products: {
    type: [productSchema], 
    default: []
  },
  deliveryAddress: {
    type: String
  },
  totalAmount: {
    type: Number,
    required: true,
    default: 0
  },
  paymentType: {
    type: String,
    enum: ["Cash"],
    default: "Cash"
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending"
  },
  orderStatus: {
    type: String,
    enum: ["Cart", "Placed", "Shipped", "Delivered"],
    default: "Cart"
  }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
