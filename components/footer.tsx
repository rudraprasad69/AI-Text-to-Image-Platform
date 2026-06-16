'use client'

import { Sparkles, Code2, Heart, Share2, Mail, ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="relative py-16 sm:py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 -z-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full mix-blend-screen filter blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/30 rounded-full mix-blend-screen filter blur-3xl opacity-30 -z-10" />

      <div className="max-w-4xl mx-auto">
        <div className="relative glass-card p-8 sm:p-12 md:p-16 rounded-2xl border border-accent/30">
          <div className="text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-foreground">Ready to Create?</span>
              <br />
              <span className="text-gradient">Start Your Free Trial Today</span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No credit card required. Get instant access to all our premium features for 14 days.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="btn-premium px-8 py-4 bg-gradient-accent text-white text-lg font-semibold group">
                <span className="relative flex items-center justify-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button className="px-8 py-4 rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 text-lg font-semibold transition-all duration-300">
                Schedule Demo
              </button>
            </div>

            <p className="text-sm text-muted-foreground">
              Join 50,000+ creators already using PixelForge AI
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    Product: [
      { label: 'Features', href: '#' },
      { label: 'Models', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'API Docs', href: '#' },
    ],
    Company: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    Legal: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Compliance', href: '#' },
    ],
  }

  return (
    <footer className="relative border-t border-border bg-gradient-to-b from-transparent to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gradient">PixelForge</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional AI image generation for creators, developers, and enterprises.
            </p>
            {/* Social links */}
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-lg border border-slate-700 hover:border-indigo-500/50 hover:bg-indigo-500/10 flex items-center justify-center transition-all duration-300">
                <Heart className="w-5 h-5 text-slate-400" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg border border-slate-700 hover:border-indigo-500/50 hover:bg-indigo-500/10 flex items-center justify-center transition-all duration-300">
                <Code2 className="w-5 h-5 text-slate-400" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg border border-slate-700 hover:border-indigo-500/50 hover:bg-indigo-500/10 flex items-center justify-center transition-all duration-300">
                <Share2 className="w-5 h-5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Links sections */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section} className="space-y-4">
              <h3 className="font-semibold text-foreground">{section}</h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Get updates on new features and tips.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-premium flex-1 rounded-r-none text-xs sm:text-sm"
              />
              <button className="px-4 py-2.5 bg-gradient-accent text-white rounded-r-lg hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 flex items-center gap-1">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-border/50 pt-8 sm:pt-12 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <p>&copy; {currentYear} PixelForge AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Status</a>
            <a href="#" className="hover:text-foreground transition-colors">System Status</a>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
