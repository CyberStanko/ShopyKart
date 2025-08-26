import React, { useContext, useState } from "react"
import { motion } from "framer-motion"
import { User, Package, Edit, Save, X, Clock, Truck, CheckCircle, Phone, MapPin } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { AppContext } from "../App"

const UserPage = () => {
  const { user, orders } = useContext(AppContext)
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState({
    name: user?.name || "",
    mobile: user?.mobile || "",
    address: user?.address || "",
  })

  // Filter orders for current user
  const userOrders = orders?.filter((order) => order.userId === user?.username) || []

  const handleSave = () => {
    // Update user context with new data
    if (user) {
      user.name = editedUser.name
      user.mobile = editedUser.mobile
      user.address = editedUser.address
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedUser({
      name: user?.name || "",
      mobile: user?.mobile || "",
      address: user?.address || "",
    })
    setIsEditing(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
      case "shipped":
        return <Truck className="w-4 h-4" />
      case "processing":
        return <Clock className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">Manage your profile and view your orders</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile Information
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                >
                  {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Username</label>
                  <p className="mt-1 text-gray-900 font-medium">{user?.username}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  {isEditing ? (
                    <Input
                      value={editedUser.name}
                      onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                      className="mt-1"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{user?.name || "Not provided"}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                  {isEditing ? (
                    <Input
                      type="tel"
                      value={editedUser.mobile}
                      onChange={(e) => setEditedUser({ ...editedUser, mobile: e.target.value })}
                      className="mt-1"
                      placeholder="Enter your mobile number"
                    />
                  ) : (
                    <div className="mt-1 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-900">{user?.mobile || "Not provided"}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Address</label>
                  {isEditing ? (
                    <textarea
                      value={editedUser.address}
                      onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Enter your complete address"
                    />
                  ) : (
                    <div className="mt-1 flex items-start">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500 mt-0.5" />
                      <span className="text-gray-900">{user?.address || "Not provided"}</span>
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="flex space-x-2">
                    <Button onClick={handleSave} size="sm" className="flex-1">
                      Save Changes
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm" className="flex-1">
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Orders Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Order History & Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No orders found</p>
                    <p className="text-sm text-gray-400">Start shopping to see your orders here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userOrders.map((order) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                            <p className="text-sm text-gray-600">Placed on {order.orderDate}</p>
                          </div>
                          <Badge className={`${getStatusColor(order.status)} flex items-center`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1 capitalize">{order.status}</span>
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-3">
                          {order.products.map((product) => (
                            <div key={product.id} className="flex items-center space-x-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{product.name}</p>
                                <p className="text-sm text-gray-600">Qty: {product.quantity}</p>
                              </div>
                              <p className="font-semibold text-gray-900">
                                ${(product.price * product.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t">
                          <div className="text-sm text-gray-600">
                            Payment: {order.paymentMethod}
                            {order.deliveryDate && (
                              <span className="ml-4">
                                Expected Delivery: {order.deliveryDate}
                              </span>
                            )}
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            Total: ${order.total.toFixed(2)}
                          </p>
                        </div>

                        {order.status === "shipped" && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center">
                              <Truck className="w-4 h-4 text-blue-600 mr-2" />
                              <span className="text-sm text-blue-800">
                                🚚 Your order is on the way! Track your package for real-time updates.
                              </span>
                            </div>
                          </div>
                        )}

                        {order.status === "processing" && (
                          <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 text-yellow-600 mr-2" />
                              <span className="text-sm text-yellow-800">
                                📦 Your order is being prepared for shipment.
                              </span>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default UserPage
