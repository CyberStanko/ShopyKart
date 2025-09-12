import { useState, useContext, use, useEffect } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import {
  Users,
  Package,
  ShoppingBag,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Download,
  ArrowLeft,
  CheckCircle,
  Clock,
  Truck,
  X,
  Save,
} from "lucide-react"
import { AppContext } from "../App"
import { Link, useParams } from "react-router-dom"

// Mock data
const mockOrders = [
  {
    id: "ORD-001",
    userId: "user1",
    userName: "John Doe",
    userEmail: "john@example.com",
    date: "2024-01-15",
    status: "delivered",
    total: 299.99,
    items: [{ name: "Premium Wireless Headphones", quantity: 1, price: 299.99 }],
    shippingAddress: "123 Main St, New York, NY 10001",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-002",
    userId: "user2",
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    date: "2024-01-14",
    status: "shipped",
    total: 199.99,
    items: [{ name: "Smart Fitness Watch", quantity: 1, price: 199.99 }],
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
    paymentMethod: "UPI",
  },
  {
    id: "ORD-003",
    userId: "user3",
    userName: "Mike Johnson",
    userEmail: "mike@example.com",
    date: "2024-01-13",
    status: "processing",
    total: 449.99,
    items: [{ name: "Ergonomic Office Chair", quantity: 1, price: 449.99 }],
    shippingAddress: "789 Pine St, Chicago, IL 60601",
    paymentMethod: "Cash on Delivery",
  },
]


const AdminPage = () => {
  const { user, showNotification } = useContext(AppContext)
  const [activeTab, setActiveTab] = useState("orders")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [orders] = useState(mockOrders)

  const [users, setUsers] = useState([])

  const [products, setProducts] = useState([])
   useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products")
        setProducts(res.data.products)
        console.log("Products:", res.data.products)
      } catch (err) {
        console.error(err)
        showNotification("Error while fetching products", "error")
      }
    }

    const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users")
      console.log("Users API Response:", res.data)

      // if backend returns array directly
      if (Array.isArray(res.data)) {
        setUsers(res.data)
      } else {
        setUsers(res.data.users || [])
      }
    } catch (err) {
      console.error(err)
      showNotification("Error while fetching users", "error")
    }
  }

    fetchProducts()
    fetchUsers()
  }, [])

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    brand: "",
    description: "",
    keyFeatures: "",
    specifications: ""
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "low_stock":
        return "bg-orange-100 text-orange-800"
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
        return null
    }
  }

const handleAddProduct = async () => {
  if (
    newProduct.name?.trim() &&
    newProduct.category?.trim() &&
    newProduct.price !== "" &&
    newProduct.stock !== "" &&
    newProduct.image?.trim()
  ) {
    try {
      const product = {
        ...newProduct,
        price: Number.parseFloat(newProduct.price) || 0,
        stock: Number.parseInt(newProduct.stock) || 0,
        sold: 0,
        status: "active",
      };

      // API call
      const res = await axios.post("http://localhost:5000/products/add", product);

      // Update frontend state
      setProducts([...products, res.data.product]);

      console.log("Adding product:", product);

      // Reset form
      setNewProduct({
        name: "",
        category: "",
        price: "",
        stock: "",
        image: "",
        brand: "",
        description: "",
        keyFeatures: "",
        specifications: "",
      });

      setShowAddProduct(false);
      showNotification("Product added successfully!", "success");
    } catch (err) {
      console.error(err);
      showNotification("Error while adding product", "error");
    }
  } else {
    showNotification("Please fill all fields including image", "error");
  }
};


  const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
      setNewProduct({ ...newProduct, image: reader.result }) // base64 string
    }
    reader.readAsDataURL(file) // converts file -> base64
  }
}

  // Edit product
const handleEditProduct = async (product) => {
  try {
    const productId = product.id || product._id; // ✅ safe check

    if (!productId) {
      showNotification("Invalid product ID", "error");
      return;
    }

    const res = await axios.put(
      `http://localhost:5000/products/update/${productId}`,
      product
    );

    // ✅ Update frontend state with DB response
    setProducts(products.map((p) =>
      (p.id || p._id) === productId ? res.data.product : p
    ));

    setEditingProduct(null);
    showNotification("Product updated successfully!", "success");
  } catch (err) {
    console.error(err);
    showNotification("Error updating product", "error");
  }
};


// Delete product
const handleDeleteProduct = async (productId) => {
  try {
    if (!productId) {
      showNotification("Invalid product ID", "error");
      return;
    }

    await axios.delete(`http://localhost:5000/products/delete/${productId}`);

    // frontend la state update
    setProducts(products.filter((p) => (p.id || p._id) !== productId));

    showNotification("Product deleted successfully!", "success");
  } catch (err) {
    console.error(err);
    showNotification("Error deleting product", "error");
  }
};



  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // const [users, setUsers] = useState([])

const filteredUsers = (users || []).filter(
  (user) =>
    user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
)


  const filteredProducts = (products || []).filter(
  (product) =>
    (product?.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    (product?.category || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
)


  if (user?.role !== "admin") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
          <Link to="/">
            <button className="bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-3 rounded-lg font-medium">
              Go Home
            </button>
          </Link>
        </div>
      </motion.div>
    )
  }

  // State
const [categories, setCategories] = useState([
  "Electronics",
  "Clothing",
  "Books",
  "Home Appliances",
])
const [newCategoryInput, setNewCategoryInput] = useState("")

// Handler for category change
const handleCategoryChange = (e) => {
  const value = e.target.value
  if (value === "add_new") {
    setNewProduct({ ...newProduct, category: "" })
  } else {
    setNewProduct({ ...newProduct, category: value })
  }
}

// Handler for adding new category
const handleAddCategory = () => {
  if (newCategoryInput.trim()) {
    setCategories([...categories, newCategoryInput.trim()])
    setNewProduct({ ...newProduct, category: newCategoryInput.trim() })
    setNewCategoryInput("")
  }
}


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <Link to={`/${useParams().storeId || ""}`}>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your e-commerce platform</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
              </div>
              <ShoppingBag className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-gray-800">{users.length}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Products</p>
                <p className="text-2xl font-bold text-gray-800">{products?.length ?? 0}</p>
              </div>
              <Package className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Revenue</p>
                <p className="text-2xl font-bold text-gray-800">
                  ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </p>
              </div>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">$</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-8">
              {[
                { id: "orders", label: "Orders", icon: ShoppingBag },
                { id: "users", label: "Users", icon: Users },
                { id: "products", label: "Products", icon: Package },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search and Actions */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex items-center space-x-4">
                {activeTab === "products" && (
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-2 rounded-lg font-medium hover:from-primary/90 hover:to-primary/70 transition-all duration-300 flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                  </button>
                )}
                <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "orders" && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Order ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Total</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{order.id}</td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium">{order.userName}</div>
                            <div className="text-sm text-gray-600">{order.userEmail}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{order.date}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                          >
                            {getStatusIcon(order.status)}
                            <span className="capitalize">{order.status}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium">${order.total}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-primary hover:text-primary/80 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "users" && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Phone</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Join Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Orders</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Total Spent</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{user.name}</td>
                        <td className="py-3 px-4 text-gray-600">{user.email}</td>
                        <td className="py-3 px-4 text-gray-600">{user.phone}</td>
                        <td className="py-3 px-4 text-gray-600">{user.joinDate}</td>
                        <td className="py-3 px-4">{user.totalOrders}</td>
                        <td className="py-3 px-4 font-medium">${user.totalSpent}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="text-primary hover:text-primary/80 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "products" && (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[700px] text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
          <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
          <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
          <th className="text-left py-3 px-4 font-semibold text-gray-700">Stock</th>
          <th className="text-left py-3 px-4 font-semibold text-gray-700">Sold</th>
          <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
          <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map((product) => {
          const productId = product.id || product._id
          const isEditing = editingProduct?.id === productId || editingProduct?._id === productId

          return (
            <tr
              key={productId}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              {/* Product + Image */}
              <td className="py-3 px-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name || "No name"}
                    className="w-12 h-12 object-cover rounded-md border"
                  />
                  <span className="font-medium text-gray-800">
                    {product.name || "Unnamed"}
                  </span>
                </div>
              </td>

              {/* Category */}
              <td className="py-3 px-4 text-gray-600">
                {product.category || "Uncategorized"}
              </td>

              {/* Price */}
              <td className="py-3 px-4 font-medium text-gray-900">
                ₹{Number(product.price || 0).toLocaleString("en-IN")}
              </td>

              {/* Stock (Editable) */}
              <td className="py-3 px-4">
                {isEditing ? (
                  <input
                    type="number"
                    value={editingProduct?.stock ?? 0}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        stock: Number.parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                ) : (
                  <span className="text-gray-700">{product.stock ?? 0}</span>
                )}
              </td>

              {/* Sold */}
              <td className="py-3 px-4 text-gray-600">{product.sold ?? 0}</td>

              {/* Status */}
              <td className="py-3 px-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    product.status || "inactive"
                  )}`}
                >
                  {(product.status || "inactive").replace("_", " ")}
                </span>
              </td>

              {/* Actions */}
              <td className="py-3 px-4">
                <div className="flex items-center space-x-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => handleEditProduct(editingProduct)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Save className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="text-primary hover:text-primary/80"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(productId)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          )
        })}

      </tbody>
    </table>
  </div>
)}

          </div>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Order Details - {selectedOrder.id}</h2>
                  <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Customer Information</h3>
                    <div className="space-y-1 text-sm">
                      <div>
                        <strong>Name:</strong> {selectedOrder.userName}
                      </div>
                      <div>
                        <strong>Email:</strong> {selectedOrder.userEmail}
                      </div>
                      <div>
                        <strong>Address:</strong> {selectedOrder.shippingAddress}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Order Information</h3>
                    <div className="space-y-1 text-sm">
                      <div>
                        <strong>Date:</strong> {selectedOrder.date}
                      </div>
                      <div>
                        <strong>Status:</strong> {selectedOrder.status}
                      </div>
                      <div>
                        <strong>Payment:</strong> {selectedOrder.paymentMethod}
                      </div>
                      <div>
                        <strong>Total:</strong> ${selectedOrder.total}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Items</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                        </div>
                        <div className="font-medium">${item.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* User Details Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">User Details - {selectedUser.name}</h2>
                  <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Personal Information</h3>
                    <div className="space-y-1 text-sm">
                      <div>
                        <strong>Name:</strong> {selectedUser.name}
                      </div>
                      <div>
                        <strong>Email:</strong> {selectedUser.email}
                      </div>
                      <div>
                        <strong>Phone:</strong> {selectedUser.phone}
                      </div>
                      <div>
                        <strong>Address:</strong> {selectedUser.address}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Account Statistics</h3>
                    <div className="space-y-1 text-sm">
                      <div>
                        <strong>Join Date:</strong> {selectedUser.joinDate}
                      </div>
                      <div>
                        <strong>Total Orders:</strong> {selectedUser.totalOrders}
                      </div>
                      <div>
                        <strong>Total Spent:</strong> ${selectedUser.totalSpent}
                      </div>
                      <div>
                        <strong>Status:</strong> {selectedUser.status}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Add Product Modal */}
        {showAddProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-bold">Add New Product</h2>
                <button
                  onClick={() => setShowAddProduct(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable form */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>

                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                    >
                      {newProduct.image ? (
                        <img
                          src={newProduct.image}
                          alt="Preview"
                          className="h-full object-contain rounded-lg"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 mb-2 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5.002 5.002 0 0115 7h1a5 5 0 010 10h-1M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <p className="text-sm">Click to upload or drag & drop</p>
                          <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                        </div>
                      )}
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>

                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newProduct.category || ""}
                    onChange={handleCategoryChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="add_new" className="font-semibold text-primary">
                      ➕ Add New Category
                    </option>
                  </select>

                  {/* Show input if "Add new category" is selected */}
                  {newProduct.category === "" && (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter new category"
                        value={newCategoryInput}
                        onChange={(e) => setNewCategoryInput(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/40"
                      />
                      <button
                        type="button"
                        onClick={handleAddCategory}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>

                {/* Price & Stock */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/40"
                  />
                </div>


                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                {/* Key Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Key Features
                  </label>
                  <textarea
                    rows="2"
                    value={newProduct.keyFeatures}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, keyFeatures: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                {/* Specifications */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specifications
                  </label>
                  <textarea
                    rows="2"
                    value={newProduct.specifications}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, specifications: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              {/* Footer buttons */}
              <div className="p-4 sm:p-6 border-t border-gray-200 flex space-x-4">
                <button
                  onClick={handleAddProduct}
                  className="flex-1 bg-gradient-to-r from-primary to-primary/80 text-white py-2 rounded-lg font-medium hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
                >
                  Add Product
                </button>
                <button
                  onClick={() => setShowAddProduct(false)}
                  className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </motion.div>
  )
}

export default AdminPage
