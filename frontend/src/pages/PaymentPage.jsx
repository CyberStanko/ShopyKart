import React, { useState, useContext, useEffect } from "react"
import { motion } from "framer-motion"
import { CreditCard, Smartphone, Building, Truck, Lock, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { AppContext } from "../App"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const PaymentPage = () => {
  const { user, showNotification, setOrders, removeFromCart } = useContext(AppContext)
  const navigate = useNavigate()
  const [checkoutItems, setCheckoutItems] = useState([])
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showCardForm, setShowCardForm] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cvv: "",
    expiryDate: ""
  })

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('checkoutItems') || '[]')
    setCheckoutItems(items)
  }, [])

  const total = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = total > 50 ? 0 : 9.99
  const tax = total * 0.08
  const finalTotal = total + shipping + tax

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method)
    setShowCardForm(method === 'card')
  }

  // const validateCardDetails = () => {
  //   if (cardDetails.cardNumber.length !== 16) {
  //     showNotification("Card number must be 16 digits", "error")
  //     return false
  //   }
  //   if (cardDetails.cvv.length !== 3) {
  //     showNotification("CVV must be 3 digits", "error")
  //     return false
  //   }
  //   if (!cardDetails.expiryDate.match(/^\d{2}\/\d{2}$/)) {
  //     showNotification("Expiry date must be in MM/YY format", "error")
  //     return false
  //   }
  //   return true
  // }
  
  const [orderId, setOrderId] = useState(null)
  const fetchOrderId = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/cart/${localStorage.getItem("userid")}`
    )
    setOrderId(res.data.cart._id)   // ✅ correct
    console.log("Order Id:", res.data.cart._id)
  } catch (err) {
    console.error("Error fetching order:", err)
  }
}

useEffect(() => {
  fetchOrderId()
}, [])

  const handlePlaceOrder = async () => {
  if (!orderId) {
    showNotification("Cart not found", "error")
    return
  }

  try {
    setIsProcessing(true)

    // Order status update API
    const res = await axios.put(
      `http://localhost:5000/orders/status/update/${orderId}`,
      {
        orderStatus: "Placed",
        paymentStatus: "Paid",
      }
    )

    console.log("Order updated:", res.data.order)

    // Checkout clear
    localStorage.removeItem("checkoutItems")

    showNotification("Order placed successfully! Cash on Delivery", "success")

    // Redirect after short delay
    setTimeout(() => navigate(`/${localStorage.getItem("userid")}`), 1500)
  } catch (err) {
    console.error("Error placing order:", err)
    showNotification("Failed to place order", "error")
  } finally {
    setIsProcessing(false)
  }
}




  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No items to checkout</h1>
            <p className="text-gray-600 mb-8">Please add items to cart first.</p>
            <Button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700">
              Continue Shopping
            </Button>
          </div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment</h1>
          <p className="text-gray-600">Complete your purchase</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Select Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* UPI Payment */}
                {/* <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handlePaymentMethodSelect('upi')}
                >
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-6 h-6 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">UPI Payment</h3>
                      <p className="text-sm text-gray-600">Pay using UPI apps like GPay, PhonePe, Paytm</p>
                    </div>
                  </div>
                </div> */}

                {/* Net Banking */}
                {/* <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'netbanking' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handlePaymentMethodSelect('netbanking')}
                >
                  <div className="flex items-center space-x-3">
                    <Building className="w-6 h-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold">Net Banking</h3>
                      <p className="text-sm text-gray-600">Pay directly from your bank account</p>
                    </div>
                  </div>
                </div> */}

                {/* Credit/Debit Card */}
                {/* <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handlePaymentMethodSelect('card')}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-6 h-6 text-purple-600" />
                    <div>
                      <h3 className="font-semibold">Credit/Debit Card</h3>
                      <p className="text-sm text-gray-600">Visa, Mastercard, RuPay accepted</p>
                    </div>
                  </div>
                </div> */}

                {/* Cash on Delivery */}
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handlePaymentMethodSelect('cod')}
                >
                  <div className="flex items-center space-x-3">
                    <Truck className="w-6 h-6 text-orange-600" />
                    <div>
                      <h3 className="font-semibold">Cash on Delivery</h3>
                      <p className="text-sm text-gray-600">Pay when your order is delivered</p>
                    </div>
                  </div>
                </div>

                {/* Card Details Form */}
                {showCardForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <h4 className="font-semibold mb-4">Enter Card Details</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number (16 digits)
                        </label>
                        <Input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.cardNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 16)
                            setCardDetails(prev => ({ ...prev, cardNumber: value }))
                          }}
                          maxLength={16}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV (3 digits)
                          </label>
                          <Input
                            type="text"
                            placeholder="123"
                            value={cardDetails.cvv}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '').slice(0, 3)
                              setCardDetails(prev => ({ ...prev, cvv: value }))
                            }}
                            maxLength={3}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date (MM/YY)
                          </label>
                          <Input
                            type="text"
                            placeholder="12/25"
                            value={cardDetails.expiryDate}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, '')
                              if (value.length >= 2) {
                                value = value.slice(0, 2) + '/' + value.slice(2, 4)
                              }
                              setCardDetails(prev => ({ ...prev, expiryDate: value }))
                            }}
                            maxLength={5}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-2">
                  {checkoutItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Place Order
                    </>
                  )}
                </Button>

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
