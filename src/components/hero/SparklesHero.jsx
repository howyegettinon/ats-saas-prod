'use client'
import { motion } from 'framer-motion'

export default function SparklesHero() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative my-12 space-y-6"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 flex justify-center">
        <div className="bg-gradient-brand w-full h-48 blur-[100px] opacity-20" />
      </div>
      
      {/* CTA Button */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        className="bg-gradient-brand text-white px-8 py-4 rounded-xl text-lg font-medium hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
      >
        Start Free Trial - €14.99/mo
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path>
        </svg>
      </motion.button>

      {/* Avatars */}
      <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
        <div className="flex -space-x-2">
          {[1,2,3,4,5].map((num) => (
            <img 
              key={num}
              src={`/images/avatars/${num}.jpg`}
              className="h-8 w-8 rounded-full border-2 border-white"
              alt="User avatar"
            />
          ))}
        </div>
        <span>4,200+ resumes optimized this week</span>
      </div>
    </motion.div>
  )
}
