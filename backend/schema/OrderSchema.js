const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: String,   // storing manual generated id (like your example)
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
    type: [productSchema],   // 👈 array of product subdocuments
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
    enum: ["Cash", "Card", "UPI"],
    default: "Cash"
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending"
  },
  orderStatus: {
    type: String,
    enum: ["Cart", "Placed", "Shipped", "Delivered", "Cancelled"],
    default: "Cart"
  }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
