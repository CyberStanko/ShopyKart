// productRoutes.js
const express = require("express");
const Product = require("../schema/ProductSchema");

const router = express.Router()

router.post("/products/add", async (req, res) => {
  try {
    const { name, category, price, stock, image, originalPrice, discount, description, keyFeatures, specifications } = req.body
    console.log(req.body);
    
    const newProduct = new Product({ name, category, price, stock, image, originalPrice, discount, description, keyFeatures, specifications })
    await newProduct.save()

    res.json({ message: "Product added", product: newProduct })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get("/products", async (req, res) => {
  console.log("Fetching products...");
  const products = await Product.find()
  console.log(products);
  res.json({products})
})

router.put("/products/update/:id", async (req, res) => {
  try {
    const { id } = req.params
    const updatedData = req.body  
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true })
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" })
    }
    res.json({ message: "Product updated", product: updatedProduct })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete("/products/delete/:id", async (req, res) => {
  try {
    const { id } = req.params 
    const deletedProduct = await Product.findByIdAndDelete(id)
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" })
    }
    res.json({ message: "Product deleted", product: deletedProduct })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router;