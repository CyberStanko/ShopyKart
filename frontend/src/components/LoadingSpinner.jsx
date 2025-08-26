
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>
        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="text-2xl font-bold text-gray-800 mb-2"
        >
          Loading ShopyKart
        </motion.h2>
        <p className="text-gray-600">Please wait while we prepare your shopping experience...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
