import { useState, useContext } from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import { motion } from "framer-motion"
import CartPage from "./CartPage"
import {
  ArrowLeft,
  Heart,
  Star,
  ShoppingCart,
  Truck,
  Shield,
  RefreshCw,
  Award,
  Plus,
  Minus,
  Share2,
  MessageCircle,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { AppContext } from "../App"

// Mock product data
const productData = {
  1: {
    productid: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 1247,
    images: [
      "https://via.placeholder.com/600x600?text=Headphones+1",
      "https://via.placeholder.com/600x600?text=Headphones+2",
      "https://via.placeholder.com/600x600?text=Headphones+3",
      "https://via.placeholder.com/600x600?text=Headphones+4",
    ],
    category: "Electronics",
    brand: "AudioTech",
    inStock: 15,
    fastDelivery: true,
    description:
      "Experience premium sound quality with our flagship wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and premium materials for ultimate comfort.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium leather ear cups",
      "Bluetooth 5.0 connectivity",
      "Quick charge: 5 min = 2 hours playback",
      "Foldable design for portability",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 ohms",
      Weight: "250g",
      Connectivity: "Bluetooth 5.0, 3.5mm jack",
      Battery: "30 hours playback",
    },
  },
  2: {
    productid: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.6,
    reviews: 892,
    images: [
      "https://via.placeholder.com/600x600?text=Smart+Watch+1",
      "https://via.placeholder.com/600x600?text=Smart+Watch+2",
      "https://via.placeholder.com/600x600?text=Smart+Watch+3",
    ],
    category: "Wearables",
    brand: "FitTech",
    inStock: 8,
    fastDelivery: true,
    description:
      "Track your fitness goals with our advanced smart watch. Monitor heart rate, sleep patterns, and stay connected with smart notifications.",
    features: [
      "Heart rate monitoring",
      "Sleep tracking",
      "GPS tracking",
      "Water resistant (50m)",
      "7-day battery life",
      "Smart notifications",
    ],
    specifications: {
      Display: "1.4 inch AMOLED",
      Battery: "7 days typical use",
      "Water Resistance": "5ATM (50m)",
      Sensors: "Heart rate, GPS, Accelerometer",
      Compatibility: "iOS & Android",
      Weight: "45g",
    },
  },
}

const reviews = [
  {
    productid: 1,
    user: "Sarah M.",
    rating: 5,
    date: "2024-01-15",
    title: "Excellent sound quality!",
    comment:
      "These headphones exceeded my expectations. The noise cancellation is fantastic and the battery life is amazing.",
    helpful: 24,
    verified: true,
  },
  {
    productid: 2,
    user: "Mike R.",
    rating: 4,
    date: "2024-01-10",
    title: "Great value for money",
    comment:
      "Really impressed with the build quality and comfort. Only minor complaint is they can get a bit warm during long sessions.",
    helpful: 18,
    verified: true,
  },
  {
    productid: 3,
    user: "Emily K.",
    rating: 5,
    date: "2024-01-08",
    title: "Perfect for work from home",
    comment: "The noise cancellation is a game changer for video calls. Highly recommend!",
    helpful: 31,
    verified: false,
  },
]

const ProductDetailsPage = () => {
  const { productid } = useParams()
  const { addToCart, toggleWishlist, wishlistItems, showNotification } = useContext(AppContext)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")

  const product = productData[productid]

  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <Link to="/categories">
            <button className="bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-3 rounded-lg font-medium">
              Browse Products
            </button>
          </Link>
        </div>
      </motion.div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  const handleBuyNow = () => {
    Navigate(CartPage)
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 mb-8 text-sm text-gray-600"
        >
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/categories" className="hover:text-primary transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-800">{product.name}</span>
        </motion.div>

        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Link to="/categories">
            <button className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Products</span>
            </button>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        wishlistItems.some((item) => item.productid === product.productid)
                          ? "text-red-500 fill-current"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-primary" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Product Title & Rating */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-primary font-medium">{product.brand}</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-600">{product.category}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-lg font-medium">{product.rating}</span>
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
                <button className="text-primary hover:text-primary/80 text-sm font-medium">Write a review</button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-primary">${product.price}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${product.inStock > 0 ? "text-green-600" : "text-red-600"}`}>
                <div className={`w-2 h-2 rounded-full ${product.inStock > 0 ? "bg-green-500" : "bg-red-500"}`} />
                <span className="font-medium">
                  {product.inStock > 0 ? `${product.inStock} in stock` : "Out of stock"}
                </span>
              </div>
              {product.fastDelivery && (
                <div className="flex items-center space-x-2 text-blue-600">
                  <Truck className="w-4 h-4" />
                  <span className="text-sm font-medium">Fast delivery available</span>
                </div>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.inStock, quantity + 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    disabled={quantity >= product.inStock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.052 }}
                whileTap={{ scale: 0.38 }}
                onClick={handleBuyNow}
                className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Buy Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={product.inStock === 0}
                className="px-6 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </motion.button>
            </div>
              

            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <RefreshCw className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Easy Returns</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <Award className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">Premium Quality</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Tab Headers */}
            <div className="border-b border-gray-200">
              <div className="flex space-x-8 px-8">
                {["description", "specifications", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-2 border-b-2 font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === "description" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Product Description</h3>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Key Features</h3>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "specifications" && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Technical Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-800">{key}:</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Customer Reviews</h3>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                      Write Review
                    </button>
                  </div>

                  {/* Review Summary */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary">{product.rating}</div>
                        <div className="flex items-center justify-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{product.reviews} reviews</div>
                      </div>
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center space-x-2 mb-1">
                            <span className="text-sm w-8">{stars}★</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{ width: `${Math.random() * 80 + 10}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.productid} className="border-b border-gray-200 pb-6">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-primary font-medium">{review.user[0]}</span>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{review.user}</span>
                                {review.verified && (
                                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                    Verified Purchase
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600">{review.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h4 className="font-medium mb-2">{review.title}</h4>
                        <p className="text-gray-600 mb-3">{review.comment}</p>
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            <span className="text-sm">Helpful ({review.helpful})</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">Reply</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProductDetailsPage
