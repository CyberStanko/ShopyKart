import React, { useState, useEffect, useRef } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  ShoppingCart,
  Heart,
  Star,
  User,
  Menu,
  X,
  Sparkles,
  TrendingUp,
  Bell,
  Gift,
  Shield,
  Truck,
  Plus,
  Minus,
} from "lucide-react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Card, CardContent } from "./components/ui/card"
import { Badge } from "./components/ui/badge"

// Import components
import Navbar from "./components/Navbar"

// Import pages
import UserPage from "./pages/UserPage"
import CartPage from "./pages/CartPage"
import LoginPage from "./pages/LoginPage"
import PaymentPage from "./pages/PaymentPage"
import ContactPage from "./pages/ContactPage"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import CategoriesPage from "./pages/CategoriesPage"
import AdminPage from "./pages/AdminPage"
import CheckoutPage from "./pages/CheckoutPage"

// Context for global state management
export const AppContext = React.createContext()

// Custom ShopyKart Logo Component
function ShopyLogo({ className = "h-8", showText = true, textClassName = "text-xl font-bold" }) {
  return (
    <div className="flex items-center space-x-3">
      <img
        src="/logo.png"
        alt="ShopyKart Logo"
        className={`${className} object-contain`}
      />
      {showText && (
        <span className={`${textClassName}`} style={{ color: '#3879bd' }}>ShopyKart</span>
      )}
    </div>
  )
}

// Sample products data
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 1247,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    category: "Electronics",
    featured: true,
    discount: 25,
    inStock: 15,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.6,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    category: "Wearables",
    featured: true,
    discount: 20,
    inStock: 8,
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    price: 449.99,
    originalPrice: 599.99,
    rating: 4.9,
    reviews: 634,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
    category: "Furniture",
    featured: false,
    discount: 25,
    inStock: 3,
  },
  {
    id: 4,
    name: "4K Ultra HD Monitor",
    price: 329.99,
    originalPrice: 429.99,
    rating: 4.7,
    reviews: 1156,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop",
    category: "Electronics",
    featured: true,
    discount: 23,
    inStock: 12,
  },
]

// Simple Navbar Component with Search Bar
function SimpleNavbar({ cartItems, user, onLoginClick, onLogout }) {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/categories?search=${encodeURIComponent(searchTerm)}`)
      setSearchTerm("")
    }
  }

  return (
    <nav className="bg-white shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <ShopyLogo className="h-12" textClassName="text-2xl font-bold" />
            </div>
          </div>

          {/* Center - Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-full
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none
                         bg-gray-50 hover:bg-white focus:bg-white
                         transition-all duration-300 hover:shadow-md focus:shadow-lg
                         text-gray-900 placeholder-gray-500"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-12 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <div className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200">
                  <Search className="h-4 w-4" />
                </div>
              </button>
            </form>
          </div>

          {/* Right Side - Nav Links, Cart, User */}
          <div className="flex items-center space-x-6">
            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-4">
              <button onClick={() => navigate('/')} className="text-gray-700 hover:text-blue-600 transition-colors">Home</button>
              <button onClick={() => navigate('/categories')} className="text-gray-700 hover:text-blue-600 transition-colors">Category</button>
              <button onClick={() => navigate('/contact')} className="text-gray-700 hover:text-blue-600 transition-colors">Contact</button>
            </div>

            {/* Cart */}
            <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
              <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-blue-600 transition-colors" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </div>

            {/* User / Login */}
            {user ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate(user.role === 'admin' ? '/admin' : '/user')}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <User className="h-6 w-6" />
                  <span className="text-sm font-medium">
                    {user.role === 'admin' ? 'Admin' : 'User'}
                  </span>
                </button>
                <Button onClick={onLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={onLoginClick} variant="outline" size="sm">
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

// Simple Product Card Component
function ProductCard({ product, onAddToCart, onToggleWishlist, isInWishlist, onProductClick }) {
  return (
    <Card className="overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group h-[400px] flex flex-col">
      <div className="relative h-48 overflow-hidden" onClick={() => onProductClick(product.id)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-500 animate-pulse">
            -{product.discount}%
          </Badge>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleWishlist(product)
          }}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:scale-110 transition-all duration-200"
        >
          <Heart className={`h-4 w-4 transition-colors ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`} />
        </button>

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Quick View
          </span>
        </div>
      </div>

      <CardContent className="p-4 flex-1 flex flex-col justify-between" onClick={() => onProductClick(product.id)}>
        <div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 h-14">{product.name}</h3>

          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="ml-2 text-xs text-gray-600">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xl font-bold text-blue-600">${product.price}</span>
              {product.originalPrice > product.price && (
                <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
            <Badge variant="outline" className="text-green-600 text-xs">
              {product.inStock} left
            </Badge>
          </div>
        </div>

        <Button
          onClick={(e) => {
            e.stopPropagation()
            onAddToCart(product)
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
          disabled={product.inStock === 0}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to cart
        </Button>
      </CardContent>
    </Card>
  )
}

// Animated Counter Component with Intersection Observer
function AnimatedCounter({ end, suffix = "", decimal = 0, format = "" }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef(null)

  // Intersection Observer to trigger animation when element is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current)
      }
    }
  }, [hasAnimated])

  // Animation logic
  useEffect(() => {
    if (!isVisible || hasAnimated) return

    const duration = 2500 // 2.5 seconds for smoother animation
    const steps = 100
    const increment = end / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        setHasAnimated(true)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isVisible, end, hasAnimated])

  const formatNumber = (num) => {
    if (format === "K" && num >= 1000) {
      return (num / 1000).toFixed(decimal) + "K"
    }
    return decimal > 0 ? num.toFixed(decimal) : Math.floor(num)
  }

  return (
    <span ref={counterRef} className="tabular-nums">
      {formatNumber(count)}{suffix}
    </span>
  )
}

// Simple Home Page Component
function HomePage() {
  const { cartItems, wishlistItems, addToCart, toggleWishlist, showNotification, user } = React.useContext(AppContext)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["All", ...new Set(products.map(p => p.category))]

  // High discount products for slides (discount >= 20%)
  const highDiscountProducts = products.filter(product => product.discount >= 20)

  // Auto-slide functionality
  useEffect(() => {
    if (highDiscountProducts.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % highDiscountProducts.length)
      }, 4000)
      return () => clearInterval(timer)
    }
  }, [highDiscountProducts.length])

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }
  
  return (
    <div className="min-h-screen bg-gray-50">

      {/* High Discount Products Slider */}
      {highDiscountProducts.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {highDiscountProducts.map((product) => (
                  <div key={product.id} className="w-full flex-shrink-0">
                    <div
                      className="relative h-80 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 cursor-pointer group overflow-hidden"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        <div className="text-center transform group-hover:scale-105 transition-transform duration-300">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <h3 className="text-4xl font-bold mb-4 drop-shadow-lg">{product.name}</h3>
                            <div className="bg-red-500 text-white px-6 py-2 rounded-full text-xl font-bold mb-6 inline-block animate-pulse">
                              {product.discount}% OFF
                            </div>
                            <div className="flex items-center justify-center space-x-6">
                              <span className="text-3xl font-bold drop-shadow-lg">${product.price}</span>
                              <span className="text-xl line-through opacity-75">${product.originalPrice}</span>
                            </div>
                            <p className="text-lg mt-4 opacity-90">Limited Time Offer!</p>
                          </motion.div>
                        </div>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation arrows */}
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + highDiscountProducts.length) % highDiscountProducts.length)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % highDiscountProducts.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Slide indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {highDiscountProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                isInWishlist={wishlistItems.some(item => item.id === product.id)}
                onProductClick={handleProductClick}
              />
            </motion.div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ShopyKart?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Experience the best online shopping with our premium features and excellent customer service.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center p-8 group hover:bg-blue-50 rounded-xl transition-all duration-300 cursor-pointer"
            >
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-blue-200 transition-all duration-300">
                <Truck className="h-10 w-10 text-blue-600 group-hover:animate-bounce" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">Fast Delivery</h3>
              <p className="text-gray-600 group-hover:text-gray-700">Get your orders delivered within 24-48 hours with our express shipping service.</p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-blue-600 font-semibold">⚡ Lightning Fast</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center p-8 group hover:bg-green-50 rounded-xl transition-all duration-300 cursor-pointer"
            >
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-green-200 transition-all duration-300">
                <Shield className="h-10 w-10 text-green-600 group-hover:animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-green-600 transition-colors">Secure Shopping</h3>
              <p className="text-gray-600 group-hover:text-gray-700">Shop with confidence using our secure payment gateway and data protection.</p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-green-600 font-semibold">🔒 100% Secure</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center p-8 group hover:bg-purple-50 rounded-xl transition-all duration-300 cursor-pointer"
            >
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-purple-200 transition-all duration-300">
                <Gift className="h-10 w-10 text-purple-600 group-hover:animate-spin" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-600 transition-colors">Easy Returns</h3>
              <p className="text-gray-600 group-hover:text-gray-700">Not satisfied? Return your items within 30 days for a full refund, no questions asked.</p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-purple-600 font-semibold">🎁 Hassle Free</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-br from-violet-200 via-purple-100 to-white py-20" style={{ color: '#3879bd' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#3879bd' }}>Our Achievements</h2>
            <p className="text-lg" style={{ color: '#3879bd', opacity: 0.8 }}>Numbers that speak for our success</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(56, 121, 189, 0.2)",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              className="group bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 hover:bg-opacity-20 transition-all duration-300 cursor-pointer"
            >
              <motion.div
                className="text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300"
                style={{ color: '#3879bd' }}
                whileHover={{
                  textShadow: "0 0 20px rgba(56, 121, 189, 0.5)"
                }}
              >
                <AnimatedCounter end={products.length} suffix="+" />
              </motion.div>
              <div className="text-lg font-medium" style={{ color: '#3879bd', opacity: 0.8 }}>Products</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              whileHover={{
                scale: 1.05,
                rotateY: -5,
                boxShadow: "0 20px 40px rgba(56, 121, 189, 0.2)",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              className="group bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 hover:bg-opacity-20 transition-all duration-300 cursor-pointer"
            >
              <motion.div
                className="text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300"
                style={{ color: '#3879bd' }}
                whileHover={{
                  textShadow: "0 0 20px rgba(56, 121, 189, 0.5)"
                }}
              >
                <AnimatedCounter end={10} suffix="K+" />
              </motion.div>
              <div className="text-lg font-medium" style={{ color: '#3879bd', opacity: 0.8 }}>Happy Customers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="group bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 hover:bg-opacity-20 transition-all duration-300"
            >
              <div className="text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300" style={{ color: '#3879bd' }}>
                <AnimatedCounter end={4.8} decimal={1} />
              </div>
              <div className="text-lg font-medium" style={{ color: '#3879bd', opacity: 0.8 }}>Average Rating</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="group bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 hover:bg-opacity-20 transition-all duration-300"
            >
              <div className="text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300" style={{ color: '#3879bd' }}>
                <AnimatedCounter end={24} suffix="/7" />
              </div>
              <div className="text-lg font-medium" style={{ color: '#3879bd', opacity: 0.8 }}>Support</div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Sample orders data
const sampleOrders = [
  {
    id: 1,
    userId: 'abc',
    userName: 'Regular User',
    products: [{ ...products[0], quantity: 2 }],
    total: 599.98,
    status: 'delivered',
    paymentMethod: 'UPI',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-17'
  },
  {
    id: 2,
    userId: 'abc',
    userName: 'Regular User',
    products: [{ ...products[1], quantity: 1 }],
    total: 199.99,
    status: 'shipped',
    paymentMethod: 'Card',
    orderDate: '2024-01-20',
    deliveryDate: '2024-01-22'
  }
]

// Sample users data
const sampleUsers = [
  {
    id: 1,
    username: 'abc',
    name: 'Regular User',
    email: 'user@example.com',
    mobile: '9876543210',
    address: '123 Main St, City, State',
    joinDate: '2024-01-01',
    totalOrders: 2
  },
  {
    id: 2,
    username: 'stanko',
    name: 'Admin User',
    email: 'admin@shopykart.com',
    mobile: '9876543211',
    address: 'Admin Office, Business District',
    joinDate: '2023-12-01',
    totalOrders: 0
  }
]

// Main App Component
function App() {
  const [user, setUser] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [wishlistItems, setWishlistItems] = useState([])
  const [notifications, setNotifications] = useState([])
  const [orders, setOrders] = useState(sampleOrders)
  const [users, setUsers] = useState(sampleUsers)
  const [isLoading, setIsLoading] = useState(true)
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])
  
  const login = (username, password) => {
    // Check for admin credentials
    if (username === 'stanko' && password === '2207') {
      setUser({ username: 'stanko', role: 'admin', name: 'Admin User' })
      showNotification("Admin login successful!", "success")
      return true
    }
    // Check for user credentials
    else if (username === 'abc' && password === '123') {
      setUser({ username: 'abc', role: 'user', name: 'Regular User', mobile: '', address: '' })
      showNotification("User login successful!", "success")
      return true
    }
    showNotification("Invalid credentials! Use stanko/2207 for admin or abc/123 for user", "error")
    return false
  }
  
  const logout = () => {
    setUser(null)
    showNotification("Logged out successfully!", "info")
  }
  
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id)
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
    showNotification(`${product.name} added to cart!`, "success")
  }
  
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId))
    showNotification("Item removed from cart!", "info")
  }
  
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems(cartItems.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ))
  }
  
  const toggleWishlist = (product) => {
    const isInWishlist = wishlistItems.some(item => item.id === product.id)
    if (isInWishlist) {
      setWishlistItems(wishlistItems.filter(item => item.id !== product.id))
      showNotification("Removed from wishlist!", "info")
    } else {
      setWishlistItems([...wishlistItems, product])
      showNotification("Added to wishlist!", "success")
    }
  }
  
  const showNotification = (message, type = "info") => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message, type }])
    setTimeout(() => removeNotification(id), 5000)
  }
  
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }
  
  const contextValue = {
    user,
    cartItems,
    wishlistItems,
    notifications,
    orders,
    users,
    products,
    login,
    logout,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    toggleWishlist,
    showNotification,
    removeNotification,
    setOrders,
    setUsers,
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SHOPY...</p>
        </div>
      </div>
    )
  }
  
  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <div className="min-h-screen bg-gray-50 select-none">
          <SimpleNavbar
            cartItems={cartItems}
            user={user}
            onLoginClick={() => window.location.href = '/login'}
            onLogout={logout}
          />
          
          {/* Notifications */}
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
                  notification.type === "success"
                    ? "bg-green-500 text-white"
                    : notification.type === "error"
                    ? "bg-red-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4" />
                    <span className="text-sm font-medium">{notification.message}</span>
                  </div>
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="ml-4 text-white hover:text-gray-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/user" element={user ? <UserPage /> : <Navigate to="/login" />} />
            <Route path="/payment" element={user ? <PaymentPage /> : <Navigate to="/login" />} />
            <Route path="/admin" element={user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />} />
            <Route path="/checkout" element={user ? <CheckoutPage /> : <Navigate to="/login" />} />
          </Routes>

          {/* Simple Footer */}
          <footer className="bg-gray-800 text-white py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center mb-4">
                    <ShopyLogo className="h-8" textClassName="text-lg font-bold" />
                  </div>
                  <p className="text-gray-400">Your premium shopping destination for quality products at unbeatable prices.</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="/" className="hover:text-white">Home</a></li>
                    <li><a href="/categories" className="hover:text-white">Categories</a></li>
                    <li><a href="/cart" className="hover:text-white">Cart</a></li>
                    <li><a href="/contact" className="hover:text-white">Contact</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Customer Service</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-center"><Shield className="h-4 w-4 mr-2" />Secure Shopping</li>
                    <li className="flex items-center"><Truck className="h-4 w-4 mr-2" />Fast Delivery</li>
                    <li className="flex items-center"><Gift className="h-4 w-4 mr-2" />Easy Returns</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Stats</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>🛍️ {products.length}+ Products</li>
                    <li>⭐ 4.8 Average Rating</li>
                    <li>🚚 Free Shipping</li>
                    <li>💯 100% Satisfaction</li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2025 ShopyKart. All rights reserved. Built with React & Tailwind CSS.</p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AppContext.Provider>
  )
}

export default App
