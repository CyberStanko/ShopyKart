import { useState, useContext } from "react"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Sparkles,
  LogOut,
  Settings,
  Package,
  Home,
  Phone,
  Grid3X3,
  UserCircle,
  User2Icon,
} from "lucide-react"
import { AppContext } from "../App"

const Navbar = () => {
  const { user, cartItems, wishlistItems, logout } = useContext(AppContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { storeId } = useParams()
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/categories?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
    }
  }

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
    navigate("/")
  }

  const navLinks = [
  { name: "Home", path: "/", icon: Home },
  { name: "Categories", path: "/categories", icon: Grid3X3 },
  { name: "Contact", path: "/contact", icon: Phone },
  { name: "User", path: "/user", icon: User },   // ✅ capital U venum (icon import name match aganum)
  { name: "Admin", path: "/admin/12345", icon: User2Icon }
];


  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-primary/20 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-2 h-2 text-white" />
              </motion.div>
            </motion.div>
            <div className="hidden sm:block">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                ShopyKart
              </span>
              <div className="text-xs text-blue-600 font-medium">Premium Shopping</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === link.path
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-gray-600 hover:text-primary hover:bg-primary/5"
                }`}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Enhanced Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <motion.form
              onSubmit={handleSearch}
              className="relative group w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
                animate={{
                  scale: isSearchFocused ? 1.1 : 1,
                  rotate: isSearchFocused ? 360 : 0,
                  color: isSearchFocused ? "#3B82F6" : "#9CA3AF"
                }}
                transition={{ duration: 0.3 }}
              >
                <Search className="w-5 h-5 text-primary/60 group-focus-within:text-primary transition-colors" />
              </motion.div>

              <motion.input
                type="text"
                placeholder="Search for products, brands, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-12 pr-12 py-3 border-2 border-primary/20 rounded-full
                         focus:border-primary focus:ring-4 focus:ring-primary/10
                         bg-white/90 backdrop-blur-sm transition-all duration-300
                         hover:shadow-lg focus:shadow-xl hover:border-primary/40
                         text-gray-900 placeholder-gray-500"
                whileFocus={{
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.15)"
                }}
              />

              {searchQuery && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2
                           text-gray-400 hover:text-gray-600 transition-colors z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}

              {!searchQuery && (
                <motion.button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2
                           bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70
                           text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className="w-4 h-4" />
                </motion.button>
              )}
            </motion.form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Wishlist */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 text-primary hover:text-primary/80 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                >
                  {wishlistItems.length}
                </motion.span>
              )}
            </motion.button>

            {/* Cart */}
            <Link to="/cart">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 text-primary hover:text-primary/80 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItems.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold"
                  >
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-8 h-8 rounded-full" />
                  <span className="text-sm font-medium text-gray-700">{user.role === "admin" ? "Admin" : "User"}</span>
                </motion.button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2"
                    >
                      <Link
                        to={user.role === "admin" ? `/admin/${storeId}` : "/user"}
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <UserCircle className="w-4 h-4" />
                        <span>{user.role === "admin" ? "Admin Panel" : "Profile"}</span>
                      </Link>
                      {user.role === "user" && (
                        <>
                          <Link
                            to="/user"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Package className="w-4 h-4" />
                            <span>Orders</span>
                          </Link>
                          <Link
                            to="/user"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                          </Link>
                        </>
                      )}
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Sign In
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-primary">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/60 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-primary/30 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </form>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-gray-200"
            >
              <div className="flex flex-col space-y-3 pt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      location.pathname === link.path
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-gray-700 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                ))}

                <Link
                  to="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                </Link>

                <button className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>Wishlist ({wishlistItems.length})</span>
                </button>

                {user ? (
                  <>
                    <Link
                      to={user.role === "admin" ? "/admin" : "/user"}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>{user.role === "admin" ? "Admin Panel" : "My Account"}</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 text-primary font-medium hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar
