import React, { useContext, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Package, Truck, Shield } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { AppContext } from "../App"
import { Link, useNavigate } from "react-router-dom"

const CartPage = () => {
  const { cartItems, removeFromCart, updateCartQuantity, user, showNotification } = useContext(AppContext)
  const navigate = useNavigate()
  const [selectedItems, setSelectedItems] = useState(new Set())

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const selectedSubtotal = cartItems
    .filter(item => selectedItems.has(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = selectedSubtotal > 50 ? 0 : 9.99
  const tax = selectedSubtotal * 0.08
  const total = selectedSubtotal + shipping + tax

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
      setSelectedItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
    } else {
      updateCartQuantity(itemId, newQuantity)
    }
  }

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const handleSelectAll = () => {
    if (selectedItems.size === cartItems.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(cartItems.map(item => item.id)))
    }
  }

  const handleCheckout = () => {
    if (!user) {
      showNotification("Please login to checkout", "error")
      navigate("/login")
      return
    }
    
    if (selectedItems.size === 0) {
      showNotification("Please select items to checkout", "error")
      return
    }

    // Store selected items for checkout
    const selectedCartItems = cartItems.filter(item => selectedItems.has(item.id))
    localStorage.setItem('checkoutItems', JSON.stringify(selectedCartItems))
    navigate("/payment")
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <ShoppingCart className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link to={`/${localStorage.getItem("userid")}`}>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Continue Shopping
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{cartItems.length} item(s) in your cart</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Cart Items
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAll}
                  >
                    {selectedItems.size === cartItems.length ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center space-x-4 py-4 border-b last:border-b-0"
                    >
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.category}</p>
                        <p className="text-sm text-green-600">In Stock: {item.inStock}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.inStock}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <Package className="w-8 h-8 text-blue-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Free Returns</h4>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <Truck className="w-8 h-8 text-green-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Fast Shipping</h4>
                  <p className="text-sm text-gray-600">2-3 business days</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <Shield className="w-8 h-8 text-purple-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Secure Payment</h4>
                  <p className="text-sm text-gray-600">SSL encrypted</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Selected Items ({selectedItems.size})</span>
                    <span className="font-medium">${selectedSubtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={handleCheckout} 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={selectedItems.size === 0}
                  >
                    Checkout Selected Items ({selectedItems.size})
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>

                  <Link to="/">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
