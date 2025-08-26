import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Star, Heart, ShoppingCart, TrendingUp, Truck } from 'lucide-react'

const ProductCard = ({ 
  product, 
  onAddToCart, 
  onToggleWishlist, 
  wishlistItems = [],
  showCategory = true,
  showBrand = true,
  showStock = true,
  className = ""
}) => {
  const isInWishlist = wishlistItems.some((item) => item.id === product.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden w-full max-w-sm mx-auto h-auto ${className}`}
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <div className="h-40 relative bg-gradient-to-br from-primary/5 to-blue-50">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {product.discount > 0 && (
              <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                -{product.discount}%
              </div>
            )}
            {product.trending && (
              <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                <TrendingUp className="w-3 h-3" />
                <span>Trending</span>
              </div>
            )}
            {product.fastDelivery && (
              <div className="absolute bottom-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                <Truck className="w-3 h-3" />
                <span>Fast</span>
              </div>
            )}
          </div>
        </div>
      </Link>

      <div className="p-4 flex flex-col justify-between" style={{ minHeight: '200px' }}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            {showCategory && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                {product.category}
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggleWishlist && onToggleWishlist(product)
              }}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${
                  isInWishlist
                    ? "text-red-500 fill-current"
                    : "text-gray-400 hover:text-red-500"
                } transition-colors`}
              />
            </button>
          </div>
          
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-base text-gray-800 group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>
          
          {showBrand && (
            <p className="text-sm text-gray-600">{product.brand}</p>
          )}

          <div className="flex items-center space-x-2">
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
              {product.rating} ({product.reviews?.toLocaleString() || 0})
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-primary">${product.price}</span>
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
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              onAddToCart && onAddToCart(product)
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            disabled={product.inStock === 0}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Buy Now</span>
          </motion.button>

          {showStock && (
            <div className="text-xs text-gray-600">
              {product.inStock > 0 ? (
                <span className="text-green-600">✓ In Stock ({product.inStock} left)</span>
              ) : (
                <span className="text-red-600">✗ Out of Stock</span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
