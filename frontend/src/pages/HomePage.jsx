import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart,
  Star,
  TrendingUp,
  Sparkles,
  Eye,
  Shield,
  Truck,
  RefreshCw,
  Award,
  Quote,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
} from "lucide-react"
import { AppContext } from "../App"

// Mock data

const features = [
  {
    icon: Shield,
    title: "Secure Shopping",
    description: "256-bit SSL encryption protects your data",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Free shipping on orders over $50",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day hassle-free return policy",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Curated products from trusted brands",
    color: "from-orange-500 to-orange-600",
  },
]

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!hasAnimated) {
      setHasAnimated(true)
      let startTime = null
      const animate = (currentTime) => {
        if (startTime === null) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [end, duration, hasAnimated])

  return (
    <span className="font-bold text-2xl">
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// Product Carousel Component
const ProductCarousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, products.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Featured Products</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button onClick={prevSlide} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={nextSlide} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl">
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {products.map((product) => (
            <div key={product.id} className="w-full flex-shrink-0">
              <div className="bg-gradient-to-br from-primary/5 to-blue-50 border-0 rounded-xl p-6">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <span className="inline-block mb-2 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      {product.category}
                    </span>
                    <h4 className="text-2xl font-bold mb-2">{product.name}</h4>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-3xl font-bold text-primary">${product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <Link to={`/product/${product.id}`}>
                      <button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </Link>
                  </div>
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    {product.discount > 0 && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center space-x-2 mt-4">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// Testimonial Carousel Component
const TestimonialCarousel = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTestimonial}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Quote className="w-12 h-12 text-primary mx-auto mb-4" />
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
            "{testimonials[currentTestimonial].text}"
          </p>
          <div className="flex items-center justify-center space-x-4">
            <img
              src={testimonials[currentTestimonial].image || "/placeholder.svg"}
              alt={testimonials[currentTestimonial].name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="font-semibold">{testimonials[currentTestimonial].name}</div>
              <div className="text-sm text-gray-600">{testimonials[currentTestimonial].role}</div>
            </div>
            <div className="flex">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center space-x-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentTestimonial ? "bg-primary" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

const HomePage = () => {
  const { addToCart, toggleWishlist, wishlistItems, showNotification } = useContext(AppContext)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-100/30" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-blue-100 px-4 py-2 rounded-full mb-6"
              >
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Trending Now</span>
                <Sparkles className="w-4 h-4 text-blue-500" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-r from-primary via-primary/80 to-blue-500 bg-clip-text text-transparent"
                >
                  Shop
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-800"
                >
                  Smarter
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent"
                >
                  Live Better
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Discover premium products that enhance your lifestyle. From cutting-edge technology to everyday
                essentials, find everything you need with ShopyKart's curated collection.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/categories">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-8 py-4 text-lg rounded-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Start Shopping</span>
                  </motion.button>
                </Link>

                <Link to="/categories">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-blue-300 text-blue-600 hover:bg-blue-50 bg-white/80 backdrop-blur-sm px-8 py-4 text-lg rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
                  >
                    <Eye className="w-5 h-5" />
                    <span>Explore Deals</span>
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex items-center space-x-8 mt-8"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    <AnimatedCounter end={50} suffix="K+" />
                  </div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">4.9★</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-blue-100 shadow-2xl">
                <img
                  src="https://via.placeholder.com/600x400?text=ShopyKart+Hero"
                  alt="ShopyKart Hero"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-2xl border border-primary/10"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-700">Live Shopping</span>
                  <Sparkles className="w-4 h-4 text-blue-500" />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-2xl border border-blue-200"
              >
                <div className="flex items-center space-x-3">
                  <Star className="w-4 h-4 text-blue-500 fill-current" />
                  <span className="text-sm font-medium text-gray-700">Premium Quality</span>
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                Why Choose ShopyKart?
              </span>
            </h2>
            <p className="text-gray-600 text-lg">Experience the future of online shopping</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center group cursor-pointer"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Carousel Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ProductCarousel products={featuredProducts.slice(0, 3)} />
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                Featured Products
              </span>
            </h2>
            <p className="text-gray-600 text-lg">Discover our handpicked selection of premium products</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                  {product.trending && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 left-3 z-10">
                      <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>Trending</span>
                      </span>
                    </motion.div>
                  )}

                  <div className="relative overflow-hidden">
                    <div className="aspect-square relative bg-gradient-to-br from-primary/5 to-blue-50">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {product.discount > 0 && (
                        <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          -{product.discount}%
                        </span>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleWishlist(product)}
                        className="absolute bottom-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg backdrop-blur-sm"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            wishlistItems.some((item) => item.id === product.id)
                              ? "text-red-500 fill-current"
                              : "text-gray-600 hover:text-red-500"
                          } transition-colors`}
                        />
                      </motion.button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {product.category}
                          </span>
                          {product.fastDelivery && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center space-x-1">
                              <Truck className="w-3 h-3" />
                              <span>Fast</span>
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-lg text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) ? "text-blue-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {product.rating} ({product.reviews.toLocaleString()})
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-primary">${product.price}</span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                            )}
                          </div>
                          {product.originalPrice > product.price && (
                            <div className="text-xs text-green-600 font-medium">
                              Save ${(product.originalPrice - product.price).toFixed(2)}
                            </div>
                          )}
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(product)}
                          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-blue-100/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                What Our Customers Say
              </span>
            </h2>
            <p className="text-gray-600 text-lg">Join thousands of satisfied customers</p>
          </motion.div>

          <TestimonialCarousel />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  <AnimatedCounter end={98} suffix="%" />
                </div>
                <div className="text-sm text-gray-600">Customer Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">
                  <AnimatedCounter end={24} suffix="h" />
                </div>
                <div className="text-sm text-gray-600">Average Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  <AnimatedCounter end={99} suffix="%" />
                </div>
                <div className="text-sm text-gray-600">On-Time Delivery</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-8 opacity-90">
              Get exclusive deals, new arrivals, and shopping tips delivered to your inbox
            </p>

            <div className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-l-lg border-0 text-gray-800 focus:ring-2 focus:ring-white/50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => showNotification("Successfully subscribed to newsletter!", "success")}
                  className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-r-lg font-medium transition-all duration-300"
                >
                  Subscribe
                </motion.button>
              </div>
              <p className="text-sm mt-4 opacity-70">
                Join <AnimatedCounter end={25000} />+ subscribers and never miss a deal!
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default HomePage
