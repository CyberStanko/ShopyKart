const express = require('express');
const Order = require('../schema/OrderSchema');
const Product = require('../schema/ProductSchema');

const router = express.Router();

// Create a new order
router.post('/orders/create', async (req, res) => {
    try {
        const { userId, products, deliveryAddress, totalAmount, paymentType } = req.body;
        console.log(req.body);
        const newOrder = new Order({ userId, products, deliveryAddress, totalAmount, paymentType });
        await newOrder.save();
        res.json({ message: 'Order created', order: newOrder });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Get all orders
router.get('/orders', async (req, res) => {
    console.log('Fetching orders...');
    const orders = await Order.find();
    console.log(orders);
    res.json({ orders });
});
// Update order status
router.put('/orders/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedOrder = await Order.findById
AndUpdate(id, updatedData, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order updated', order: updatedOrder });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Delete an order
router.delete('/orders/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order deleted', order: deletedOrder });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Add products to cart (order with status 'Cart')
router.post('/cart/add', async (req, res) => {
    try {
        const { userId, product, quantity } = req.body;
        // product = { name, price, image }

        console.log(req.body);

        let order = await Order.findOne({ userId, orderStatus: 'Cart' });
        if (!order) {
            order = new Order({
                userId,
                products: [],
                orderStatus: 'Cart',
                totalAmount: 0,
                paymentType: 'Cash',
                paymentStatus: 'Pending',
                deliveryAddress: ''
            });
            await order.save();
        }

        // Check if same product (by name) already exists in cart
        const productInCart = order.products.find(p => p.name === product.name);
        if (productInCart) {
            productInCart.quantity += quantity;
        } else {
            order.products.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity
            });
        }

        order.totalAmount += product.price * quantity;
        await order.save();

        res.json({ message: 'Product added to cart', cart: order });
    }
    catch (err) {
        console.error("Error adding product to cart:", err);
        res.status(500).json({ error: err.message });
    }
});

// Get cart for a user
router.get('/cart/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const order = await Order.findOne({ userId, orderStatus: 'Cart' });
        if (!order) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.json({ cart: order });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// cart qty update
router.put('/cart/update/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;
    let order = await Order.findOne({ userId, orderStatus: 'Cart' });
    if (!order) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    const product = order.products.find(
        (p) => p.id?.toString() === productId.toString() // compare by product id
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }
    
    console.log(product);
    
    order.totalAmount -= product.price * product.quantity; // subtract old amount
    product.quantity = quantity;
    order.totalAmount += product.price * product.quantity; // add new amount
    await order.save();
    res.json({ message: 'Cart updated', cart: order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Delete Product from cart
router.delete('/cart/delete/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;

    let order = await Order.findOne({ userId, orderStatus: 'Cart' });
    if (!order) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const productIndex = order.products.findIndex(
      (p) => p.id?.toString() === productId.toString() // compare by product id
    );

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    const product = order.products[productIndex];
    order.totalAmount -= product.price * product.quantity;
    order.products.splice(productIndex, 1);

    await order.save();
    res.json({ message: 'Product removed from cart', cart: order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Checkout cart
router.post('/cart/checkout', async (req, res) => {
    try {
        const { userId, deliveryAddress, paymentType } = req.body;
        let order = await Order.findOne({ userId, orderStatus: 'Cart' });
        if (!order) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        order.deliveryAddress = deliveryAddress;
        order.paymentType = paymentType;
        order.orderStatus = 'Placed';
        order.paymentStatus = paymentType === 'Cash' ? 'Pending' : 'Completed';
        await order.save();
        res.json({ message: 'Checkout successful', order });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;