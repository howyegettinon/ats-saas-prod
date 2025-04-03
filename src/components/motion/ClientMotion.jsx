'use client'
import { motion } from 'framer-motion'

export const ClientMotion = ({ 
  children, 
  className, 
  ...props 
}) => (
  <motion.div 
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)
