import { useState, useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams, Link } from "react-router-dom"
import { Search, Grid, List, Star, Heart, ShoppingCart, TrendingUp, ChevronDown } from "lucide-react"
import { AppContext } from "../App"
import ProductCard from "../components/ProductCard"

// Mock products data
const allProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 1247,
    image: "https://via.placeholder.com/300x300?text=Headphones",
    category: "Electronics",
    brand: "AudioTech",
    featured: true,
    discount: 25,
    trending: true,
    inStock: 15,
    fastDelivery: true,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.6,
    reviews: 892,
    image: "https://via.placeholder.com/300x300?text=Smart+Watch",
    category: "Wearables",
    brand: "FitTech",
    featured: true,
    discount: 20,
    trending: false,
    inStock: 8,
    fastDelivery: true,
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    price: 449.99,
    originalPrice: 599.99,
    rating: 4.9,
    reviews: 634,
    image: "https://via.placeholder.com/300x300?text=Office+Chair",
    category: "Furniture",
    brand: "ComfortPlus",
    featured: false,
    discount: 25,
    trending: true,
    inStock: 3,
    fastDelivery: false,
  },
  {
    id: 4,
    name: "4K Ultra HD Monitor",
    price: 329.99,
    originalPrice: 429.99,
    rating: 4.7,
    reviews: 1156,
    image: "https://via.placeholder.com/300x300?text=4K+Monitor",
    category: "Electronics",
    brand: "ViewTech",
    featured: true,
    discount: 23,
    trending: false,
    inStock: 12,
    fastDelivery: true,
  },
  {
    id: 5,
    name: "Mechanical Gaming Keyboard",
    price: 159.99,
    originalPrice: 199.99,
    rating: 4.5,
    reviews: 743,
    image: "https://via.placeholder.com/300x300?text=Gaming+Keyboard",
    category: "Gaming",
    brand: "GamePro",
    featured: false,
    discount: 20,
    trending: true,
    inStock: 25,
    fastDelivery: true,
  },
  {
    id: 6,
    name: "Wireless Charging Pad",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.3,
    reviews: 521,
    image: "https://via.placeholder.com/300x300?text=Charging+Pad",
    category: "Accessories",
    brand: "ChargeTech",
    featured: false,
    discount: 29,
    trending: false,
    inStock: 50,
    fastDelivery: true,
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.4,
    reviews: 892,
    image: "https://via.placeholder.com/300x300?text=Bluetooth+Speaker",
    category: "Electronics",
    brand: "SoundWave",
    featured: false,
    discount: 25,
    trending: false,
    inStock: 18,
    fastDelivery: true,
  },
  {
    id: 8,
    name: "Laptop Stand",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviews: 456,
    image: "https://via.placeholder.com/300x300?text=Laptop+Stand",
    category: "Accessories",
    brand: "DeskPro",
    featured: false,
    discount: 20,
    trending: false,
    inStock: 32,
    fastDelivery: true,
  },
]

const categories = ["All", "Electronics", "Wearables", "Furniture", "Gaming", "Accessories"]
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
]

const CategoriesPage = () => {
  const { addToCart, toggleWishlist, wishlistItems } = useContext(AppContext)
  const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState("grid")
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort products
  let filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Sort products
  filteredProducts = filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id - a.id
      default:
        return b.featured - a.featured
    }
  })



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-violet-200 via-purple-100 to-white"
    >


      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white shadow-lg border-b sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort and View Options */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-primary text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-primary text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">




        {/* Category Products Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          
        </motion.div>

        {/* Products Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${sortBy}-${viewMode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-6"
            }
          >
            {filteredProducts.map((product, index) => (
              viewMode === "grid" ? (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={addToCart}
                    onToggleWishlist={toggleWishlist}
                    wishlistItems={wishlistItems}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group cursor-pointer flex items-center space-x-6 bg-white rounded-xl shadow-lg p-6"
                >
                  {/* List View */}
                  <Link to={`/product/${product.id}`} className="flex-shrink-0">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </Link>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {product.category}
                          </span>
                          {product.trending && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center space-x-1">
                              <TrendingUp className="w-3 h-3" />
                              <span>Trending</span>
                            </span>
                          )}
                        </div>
                        <Link to={`/product/${product.id}`}>
                          <h3 className="text-xl font-semibold text-gray-800 hover:text-primary transition-colors mb-2">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-gray-600 mb-2">{product.brand}</p>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex items-center">
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
                            {product.rating} ({product.reviews.toLocaleString()})
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-primary">${product.price}</span>
                            {product.originalPrice > product.price && (
                              <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                            )}
                          </div>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-green-600 font-medium">
                              Save ${(product.originalPrice - product.price).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-3">
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              wishlistItems.some((item) => item.id === product.id)
                                ? "text-red-500 fill-current"
                                : "text-gray-400 hover:text-red-500"
                            } transition-colors`}
                          />
                        </button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(product)}
                          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Buy Now</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
                setSortBy("featured")
              }}
              className="bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-3 rounded-lg font-medium hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default CategoriesPage
