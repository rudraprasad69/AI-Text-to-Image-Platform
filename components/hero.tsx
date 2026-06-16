'use client'

import { ArrowRight, Play, Pause, ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'

const slideshowItems = [
  {
    title: 'Cyberpunk Neon City',
    prompt: 'Cyberpunk neon city street with flying vehicles and holographic signs, futuristic, masterpiece, 8k resolution',
    url: 'https://image.pollinations.ai/prompt/cyberpunk%20neon%20city%20street%20with%20flying%20vehicles%20and%20holographic%20signs%20futuristic%20highly%20detailed%20cinematic?model=flux&width=1024&height=576&seed=777&nologo=true',
    seed: 777,
    model: 'Phoenix Pro (Flux)'
  },
  {
    title: 'Bioluminescent Forest',
    prompt: 'Enchanted magical forest with glowing mushrooms, bioluminescent fairytale, volumetric lighting, hyperdetailed',
    url: 'https://image.pollinations.ai/prompt/enchanted%20magical%20forest%20with%20glowing%20mushrooms%20bioluminescent%20fairytale%20volumetric%20lighting?model=flux&width=1024&height=576&seed=888&nologo=true',
    seed: 888,
    model: 'Phoenix Pro (Flux)'
  },
  {
    title: 'Nebula Explorer',
    prompt: 'Futuristic astronaut standing on a foreign planet looking at a distant nebula, epic sci-fi digital art, masterpiece',
    url: 'https://image.pollinations.ai/prompt/futuristic%20astronaut%20standing%20on%20a%20foreign%20planet%20looking%20at%20a%20distant%20nebula%20epic%20sci%20fi%20masterpiece?model=flux&width=1024&height=576&seed=999&nologo=true',
    seed: 999,
    model: 'Phoenix Pro (Flux)'
  },
  {
    title: 'Cosmic Fluidity',
    prompt: 'Cosmic abstract swirling ribbons of liquid gold and cyan energy in deep space, volumetric lighting, 3d render',
    url: 'https://image.pollinations.ai/prompt/cosmic%20abstract%20swirling%20ribbons%20of%20liquid%20gold%20and%20cyan%20energy%20in%20deep%20space%203d%20render%20masterpiece?model=flux&width=1024&height=576&seed=111&nologo=true',
    seed: 111,
    model: 'Phoenix Pro (Flux)'
  }
]

export function Hero() {
  const [isPlayingPreview, setIsPlayingPreview] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end center'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  // Slideshow auto-play effect
  useEffect(() => {
    if (!isPlayingPreview || isPaused) return

    const interval = setInterval(() => {
      setImageLoaded(false)
      setCurrentIndex((prev) => (prev + 1) % slideshowItems.length)
    }, 4500)

    return () => clearInterval(interval)
  }, [isPlayingPreview, isPaused])

  const scrollToGenerator = () => {
    const generatorElement = document.getElementById('generator')
    if (generatorElement) {
      generatorElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const startSlideshow = () => {
    setIsPlayingPreview(true)
    const cardElement = document.getElementById('hero-showcase')
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setImageLoaded(false)
    setCurrentIndex((prev) => (prev + 1) % slideshowItems.length)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setImageLoaded(false)
    setCurrentIndex((prev) => (prev - 1 + slideshowItems.length) % slideshowItems.length)
  }

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPaused(!isPaused)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlayingPreview(false)
    setIsPaused(false)
    setCurrentIndex(0)
  }

  const handleTryPrompt = (e: React.MouseEvent, promptText: string) => {
    e.stopPropagation()
    
    // Dispatch custom event to load prompt in PromptDemo generator
    const event = new CustomEvent('use-gallery-prompt', {
      detail: {
        prompt: promptText,
        model: 'phoenix-pro',
        quality: 'excellent'
      }
    })
    window.dispatchEvent(event)
    scrollToGenerator()
  }

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
            onClick={scrollToGenerator}
            className="btn-premium px-8 py-4 bg-gradient-accent text-white text-lg font-semibold group cursor-pointer"
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
            onClick={startSlideshow}
            className="btn-premium px-8 py-4 border border-border hover:border-accent/50 hover:bg-accent/5 text-lg font-semibold flex items-center justify-center gap-2 group cursor-pointer"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div whileHover={{ scale: 1.2 }}>
              <Play className="w-5 h-5 fill-accent text-accent animate-pulse" />
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

        {/* Showcase image card / slideshow */}
        <motion.div
          id="hero-showcase"
          className="mt-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.div className="relative max-w-4xl mx-auto" whileHover={!isPlayingPreview ? { y: -8 } : {}}>
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-30 blur-2xl rounded-2xl animate-pulse" />
            <div className="relative bg-gradient-to-br from-card to-background border border-border rounded-2xl p-2 overflow-hidden">
              
              <div className="relative w-full aspect-video bg-muted rounded-xl flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  {!isPlayingPreview ? (
                    // 1. Static Preview Placeholder State
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsPlayingPreview(true)}
                      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center cursor-pointer group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                      
                      <div className="relative text-center space-y-4 z-10">
                        <motion.div
                          className="w-20 h-20 rounded-full bg-accent/20 border border-accent/50 mx-auto flex items-center justify-center shadow-lg shadow-accent/20"
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(139, 92, 246, 0.4)' }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Play className="w-10 h-10 text-accent fill-accent ml-1" />
                        </motion.div>
                        <p className="text-base font-semibold text-foreground tracking-wide uppercase drop-shadow">
                          Open Live Gallery Preview
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    // 2. Interactive AI Masterpiece Slideshow State
                    <motion.div
                      key="slideshow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      {/* Image Shimmer Background while loading */}
                      {!imageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-muted via-card to-muted animate-shimmer" />
                      )}

                      {/* Display image with cross-fade */}
                      <motion.img
                        key={currentIndex}
                        src={slideshowItems[currentIndex].url}
                        alt={slideshowItems[currentIndex].title}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                        style={{ opacity: imageLoaded ? 1 : 0 }}
                        onLoad={() => setImageLoaded(true)}
                      />

                      {/* Top Overlay Bar */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                        <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-accent animate-spin" />
                          <span className="text-[10px] font-semibold text-white tracking-wider uppercase">
                            Live Masterpiece Showcase
                          </span>
                        </div>

                        {/* Top controls: Pause, Prev, Next, Close */}
                        <div className="flex gap-2">
                          <button
                            onClick={handleTogglePlay}
                            className="p-2 rounded-lg bg-black/60 hover:bg-black/80 border border-white/10 text-white backdrop-blur-md transition-colors cursor-pointer"
                            title={isPaused ? 'Play auto-rotation' : 'Pause auto-rotation'}
                          >
                            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={handlePrev}
                            className="p-2 rounded-lg bg-black/60 hover:bg-black/80 border border-white/10 text-white backdrop-blur-md transition-colors cursor-pointer"
                            title="Previous image"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={handleNext}
                            className="p-2 rounded-lg bg-black/60 hover:bg-black/80 border border-white/10 text-white backdrop-blur-md transition-colors cursor-pointer"
                            title="Next image"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={handleClose}
                            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 text-red-200 backdrop-blur-md transition-colors cursor-pointer"
                            title="Close Showcase"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Bottom Glassmorphic Prompt Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 z-20">
                        <motion.div
                          className="p-4 sm:p-5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="space-y-1 max-w-xl">
                            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                              <span>{slideshowItems[currentIndex].title}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-md bg-accent/20 border border-accent/30 text-accent font-semibold">
                                seed: {slideshowItems[currentIndex].seed}
                              </span>
                            </h4>
                            <p className="text-xs text-gray-300 italic line-clamp-2 leading-relaxed">
                              "{slideshowItems[currentIndex].prompt}"
                            </p>
                          </div>

                          <motion.button
                            onClick={(e) => handleTryPrompt(e, slideshowItems[currentIndex].prompt)}
                            className="px-4 py-2.5 rounded-lg bg-gradient-accent text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:shadow-lg hover:shadow-accent/20 transition-all cursor-pointer whitespace-nowrap self-start sm:self-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span>Try Prompt</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </motion.button>
                        </motion.div>
                      </div>

                      {/* Next/Prev Large Hover Arrows */}
                      <div className="absolute inset-y-0 left-0 flex items-center z-10 pl-2 opacity-0 hover:opacity-100 transition-opacity">
                        <button
                          onClick={handlePrev}
                          className="p-3 rounded-full bg-black/40 text-white backdrop-blur-sm cursor-pointer hover:bg-black/60 transition-colors"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="absolute inset-y-0 right-0 flex items-center z-10 pr-2 opacity-0 hover:opacity-100 transition-opacity">
                        <button
                          onClick={handleNext}
                          className="p-3 rounded-full bg-black/40 text-white backdrop-blur-sm cursor-pointer hover:bg-black/60 transition-colors"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
