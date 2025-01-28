import React from 'react'
import { Link } from 'gatsby'

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Zen Car Buying</h3>
            <p className="text-secondary">Your trusted concierge for stress-free car purchases</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-secondary hover:text-white">Services</Link></li>
              <li><Link to="/about" className="text-secondary hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-secondary hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-secondary hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-secondary hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-secondary mt-8 pt-4 text-center text-secondary">
          © {new Date().getFullYear()} Zen Car Buying. All rights reserved.
        </div>
      </div>
    </footer>
  )
}