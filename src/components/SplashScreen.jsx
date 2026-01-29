import { motion } from "framer-motion";

export default function SplashScreen() { return ( <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white relative overflow-hidden"> {/* Glow background */} <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black" />

{/* RB Logo */}
  <motion.div
    initial={{ scale: 0.6, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="text-6xl font-bold text-blue-500 tracking-widest z-10"
  >
    RB
  </motion.div>

  {/* Subtitle */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2, duration: 1 }}
    className="mt-4 text-lg text-gray-300 z-10"
  >
    محاسبك الذكي
  </motion.p>

  {/* Robot Placeholder */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2, duration: 1 }}
    className="mt-10 w-40 h-40 rounded-full bg-blue-600/20 border border-blue-500 flex items-center justify-center text-blue-400 z-10"
  >
    🤖
  </motion.div>

  {/* Tagline */}
  <motion.p
    initial={{ opacity:
