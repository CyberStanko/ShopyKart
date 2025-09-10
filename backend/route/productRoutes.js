// productRoutes.js
const express = require("express");
const Product = require("../schema/ProductSchema");

const router = express.Router()

router.post("/products", async (req, res) => {
  try {
    const { name, category, price, stock, image } = req.body
    console.log(req.body);
    
    const newProduct = new Product({ name, category, price, stock, image })
    await newProduct.save()

    res.json({ message: "Product added", product: newProduct })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get("/", async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

module.exports = router;