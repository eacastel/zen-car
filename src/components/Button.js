import React from 'react'
import { Link } from 'gatsby'

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
    <Link
      to={to}
      className={`${colors[color]} ${sizes[size]} rounded-lg font-semibold transition-colors duration-200`}
    >
      {children}
    </Link>
  )
}

export default Button