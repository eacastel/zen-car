import React, { useState } from 'react'
import { Link } from 'gatsby'
import { Squash as Hamburger } from 'hamburger-react'

export default function Header() {
  const [isOpen, setOpen] = useState(false)

  return (
    <header className="bg-primary text-white" role="banner">
      <nav className="container mx-auto px-6 py-4" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-accent">
            <span className="sr-only">Home</span>
            Zen Car Buying
          </Link>

          <div className="md:hidden">
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            size={24}
            color="#FFFFFF"
            distance="sm"
            rounded
          />
          </div>

          <div className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center md:space-x-8 absolute md:static top-full left-0 right-0 bg-primary z-50 px-6 py-4`}>
            <ul className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-4 md:space-y-0">
              <li>
                <Link 
                  to="/services" 
                  className="hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
                  activeClassName="text-accent font-semibold"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  to="/how-it-works" 
                  className="hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
                  activeClassName="text-accent font-semibold"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
                  activeClassName="text-accent font-semibold"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="bg-accent px-4 py-2 rounded hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Free Consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}