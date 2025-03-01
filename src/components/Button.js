import React from 'react'
import { Link } from 'gatsby'
import { motion } from 'framer-motion'

const Button = ({ to, children, color = 'primary', size = 'base' }) => {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    base: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  }

  const colors = {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    accent: 'bg-accent hover:bg-accent-dark text-white',
    secondary: 'bg-secondary text-primary hover:bg-secondary-dark'
  }

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }} 
      transition={{ duration: 0.2 }}
    >
      <Link
        to={to}
        className={`${colors[color]} ${sizes[size]} rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2`}
      >
        {children}
      </Link>
    </motion.div>
  )
}

export default Button
