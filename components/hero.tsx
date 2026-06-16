'use client'

import { ArrowRight, Play } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { SCROLL_ANIMATIONS, HOVER_LIFT } from '@/lib/animations'

export function Hero() {
  const [isPlaying, setIsPlaying] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end center'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden pt-32 pb-20 px-4">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-premium -z-10" />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-primary/30 rounded-full mix-blend-screen filter blur-3xl animate-float opacity-40"
        style={{ y }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/30 rounded-full mix-blend-screen filter blur-3xl animate-float opacity-40"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent/20 rounded-full mix-blend-screen filter blur-3xl animate-float opacity-30"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="px-4 py-2 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-accent">Introducing PixelForge 2.0</span>
          </div>
        </div>

        {/* Main heading */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <motion.span
              className="block text-foreground mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Create Stunning
            </motion.span>
            <motion.span
              className="text-gradient"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              AI-Generated Images
            </motion.span>
          </h1>
          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transform your imagination into breathtaking visuals. PixelForge AI combines cutting-edge technology with intuitive design to empower your creativity.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            className="btn-premium px-8 py-4 bg-gradient-accent text-white text-lg font-semibold group"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative flex items-center justify-center gap-2">
              Start Creating
              <motion.span whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400 }}>
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </span>
            <div className="absolute inset-0 bg-white/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-500" />
          </motion.button>

          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="btn-premium px-8 py-4 border border-border hover:border-accent/50 hover:bg-accent/5 text-lg font-semibold flex items-center justify-center gap-2 group"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div whileHover={{ scale: 1.2 }}>
              <Play className="w-5 h-5 fill-accent text-accent" />
            </motion.div>
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-gradient">10M+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Images Generated</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-gradient">50K+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-gradient">99.9%</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Uptime SLA</div>
          </div>
        </motion.div>

        {/* Showcase image placeholder */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.div className="relative max-w-4xl mx-auto" whileHover={{ y: -8 }}>
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-30 blur-2xl rounded-2xl" />
            <div className="relative bg-gradient-to-br from-card to-background border border-border rounded-2xl p-2 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              <div className="relative w-full aspect-video bg-muted rounded-xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />
                <div className="relative text-center space-y-4 z-10">
                  <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/50 mx-auto flex items-center justify-center animate-pulse">
                    <Play className="w-8 h-8 text-accent fill-accent" />
                  </div>
                  <p className="text-sm text-muted-foreground">Gallery Preview</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
