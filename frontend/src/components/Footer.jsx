
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Sparkles, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    "Quick Links": [
      { name: "Home", path: "/" },
      { name: "Categories", path: "/categories" },
      { name: "Contact", path: "/contact" },
      { name: "Cart", path: "/cart" },
    ],
    "Customer Service": [
      { name: "Help Center", path: "/contact" },
      { name: "Shipping Info", path: "/contact" },
      { name: "Returns", path: "/contact" },
      { name: "Size Guide", path: "/contact" },
    ],
    Company: [
      { name: "About Us", path: "/contact" },
      { name: "Careers", path: "/contact" },
      { name: "Privacy Policy", path: "/contact" },
      { name: "Terms of Service", path: "/contact" },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { icon: Instagram, href: "#", color: "hover:text-pink-600" },
    { icon: Linkedin, href: "#", color: "hover:text-blue-700" },
  ]

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center"
              >
                <span className="text-white font-bold text-lg">S</span>
              </motion.div>
              <div>
                <span className="text-2xl font-bold">ShopyKart</span>
                <div className="text-xs text-blue-400">Premium Shopping</div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your premium destination for quality products and exceptional shopping experience. Shop smarter, live
              better with ShopyKart.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className={`w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center transition-colors ${social.color}`}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4 text-lg">{title}</h4>
              <ul className="space-y-3 text-gray-300">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="hover:text-primary transition-colors hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact Info</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@shopykart.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span>123 Shopping St, NY 10001</span>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm">24/7 Customer Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Get exclusive deals, new arrivals, and shopping tips delivered to your inbox
            </p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-lg border-0 text-gray-800 focus:ring-2 focus:ring-primary"
              />
              <button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-6 py-2 rounded-r-lg font-medium transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-center md:text-left">&copy; {currentYear} ShopyKart. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span className="text-gray-400 text-sm">by</span>
            <div className="flex items-center space-x-1">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">React.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
