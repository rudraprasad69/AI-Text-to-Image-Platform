'use client'

import { useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Models', href: '#models' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Gallery', href: '#gallery' },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="relative w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center overflow-hidden">
              <Sparkles className="w-5 h-5 text-white" />
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-accent bg-clip-text text-transparent">
              PixelForge
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex gap-3">
            <button className="px-5 py-2 rounded-lg text-sm font-medium border border-border hover:border-accent/50 hover:bg-accent/5 transition-all duration-300">
              Sign In
            </button>
            <button className="px-5 py-2 rounded-lg text-sm font-medium bg-gradient-accent text-white hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 transition-all duration-300">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-border pt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <button className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border border-border hover:border-accent/50 transition-all duration-300">
                Sign In
              </button>
              <button className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-accent text-white hover:shadow-lg hover:shadow-accent/30 transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
