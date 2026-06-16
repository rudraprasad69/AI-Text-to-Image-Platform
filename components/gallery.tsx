'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Copy, Check, Eye, Zap, RefreshCw, Sliders } from 'lucide-react'

interface GalleryItem {
  id: number
  title: string
  prompt: string
  category: string
  seed: number
  model: string
  resolution: string
  quality: string
  url: string
}

const categories = ['All', 'Landscape', 'Portrait', 'Abstract', 'Fantasy', 'Product']

const galleryItems: GalleryItem[] = [
  // 1. Landscape
  {
    id: 1,
    title: 'Golden Hour Fjords',
    prompt: 'majestic norwegian fjords at golden hour, reflection in crystal clear water, epic lighting, 8k resolution, cinematic',
    category: 'Landscape',
    seed: 12345,
    model: 'Phoenix Pro (Flux)',
    resolution: '1024x1024 (1:1)',
    quality: 'excellent',
    url: 'https://image.pollinations.ai/prompt/majestic%20norwegian%20fjords%20at%20golden%20hour%2C%20reflection%20in%20crystal%20clear%20water%2C%20epic%20lighting%2C%208k%20resolution%2C%20cinematic?model=flux&width=1024&height=1024&seed=12345&nologo=true'
  },
  {
    id: 2,
    title: 'Neon Oasis',
    prompt: 'cyberpunk futuristic oasis in a desert, glowing blue pools, neon palm trees, synthwave aesthetic, detailed',
    category: 'Landscape',
    seed: 54321,
    model: 'Phoenix Pro (Flux)',
    resolution: '1024x1024 (1:1)',
    quality: 'excellent',
    url: 'https://image.pollinations.ai/prompt/cyberpunk%20futuristic%20oasis%20in%20a%20desert%2C%20glowing%20blue%20pools%2C%20neon%20palm%20trees%2C%20synthwave%20aesthetic%2C%20detailed?model=flux&width=1024&height=1024&seed=54321&nologo=true'
  },
  {
    id: 3,
    title: 'Zen Rock Garden',
    prompt: 'minimalist zen rock garden with raked sand patterns, cherry blossom tree, tranquil atmosphere, soft morning sunlight',
    category: 'Landscape',
    seed: 55667,
    model: 'Phoenix Pro (Flux)',
    resolution: '1024x1024 (1:1)',
    quality: 'excellent',
    url: 'https://image.pollinations.ai/prompt/minimalist%20zen%20rock%20garden%20with%20raked%20sand%20patterns%2C%20cherry%20blossom%20tree%2C%20tranquil%20atmosphere%2C%20soft%20morning%20sunlight?model=flux&width=1024&height=1024&seed=55667&nologo=true'
  },
  // 2. Portrait
  {
    id: 4,
    title: 'Cybernetic Android',
    prompt: 'close up portrait of a cyberpunk female cyborg with glowing blue neon details, highly detailed face, realistic skin texture, masterpiece',
    category: 'Portrait',
    seed: 98765,
    model: 'Phoenix Pro (Flux)',
    resolution: '1024x1024 (1:1)',
    quality: 'excellent',
    url: 'https://image.pollinations.ai/prompt/close%20up%20portrait%20of%20a%20cyberpunk%20female%20cyborg%20with%20glowing%20blue%20neon%20details%2C%20highly%20detailed%20face%2C%20realistic%20skin%20texture%2C%20masterpiece?model=flux&width=1024&height=1024&seed=98765&nologo=true'
  },
  {
    id: 5,
    title: 'Forest Mage',
    prompt: 'mystical forest mage with a glowing staff, green cloak, deep eyes, fantasy style, magical atmosphere, detailed',
    category: 'Portrait',
    seed: 67890,
    model: 'Phoenix Pro (Flux)',
    resolution: '1024x1024 (1:1)',
    quality: 'excellent',
    url: 'https://image.pollinations.ai/prompt/mystical%20forest%20mage%20with%20a%20glowing%20staff%2C%20green%20cloak%2C%20deep%20eyes%2C%20fantasy%20style%2C%20magical%20atmosphere%2C%20detailed?model=flux&width=1024&height=1024&seed=67890&nologo=true'
  },
  {
    id: 6,
    title: 'Aura Dancer',
    prompt: 'portrait of a graceful dancer surrounded by colorful swirling energy particles, long exposure aesthetic, dreamlike lighting',
    category: 'Portrait',
    seed: 44332,
    model: 'Phoenix Pro (Flux)',
    resolution: '1024x1024 (1:1)',
    quality: 'excellent',
    url: 'https://image.pollinations.ai/prompt/portrait%20of%20a%20graceful%20dancer%20surrounded%20by%20colorful%20swirling%20energy%20particles%2C%20long%20exposure%20aesthetic%2C%20dreamlike%20lighting?model=flux&width=1024&height=1024&seed=44332&nologo=true'
  },
  // 3. Abstract
  {
    id: 7,
    title: 'Cosmic Fluidity',
    prompt: 'abstract floating 3d liquid gold and purple metallic ribbons, swirling energy, volumetric lighting, dark backdrop, premium design',
    category: 'Abstract',
    seed: 11223,
    model: 'Phoenix Pro (Flux)',
    resolution: '1024x1024 (1:1)',
    quality: 'excellent',
    url: 'https://image.pollinations.ai/prompt/abstract%20floating%203d%20liquid%20gold%20and%20purple%20metallic%20ribbons%2C%20swirling%20energy%2C%20volumetric%20lighting%2C%20dark%20backdrop%2C%20premium%20design?model=flux&width=1024&height=1024&seed=11223&nologo=true'
  },
  {
    id: 8,
    title: 'Geometric Dream',
    prompt: 'abstract minimalist geometric composition with pastel spheres, rings, and steps, soft lighting, 3d render, modern art',
    category: 'Abstract',
    seed: 44556,
    model: 'Phoenix Pro (Flux)',
    resolution: '1024x1024 (1:1)',
    quality: 'excellent',
    url: 'https://image.pollinations.ai/prompt/abstract%20minimalist%20geometric%20composition%20with%20pastel%20spheres%2C%20rings%2C%20and%20steps%2C%20soft%20lighting%2C%203d%20render%2C%20modern%20art?model=flux&width=1024&height=1024&seed=44556&nologo=true'
  },
  // 4. Fantasy
  {
    id: 9,
    title: 'Dragon Citadel',
    prompt: 'ancient citadel built on a jagged mountain peak, a giant dragon soaring above, dramatic storm clouds, epic fantasy illustration',
    category: 'Fantasy',
    seed: 88990,
    model: 'Phoenix Pro (Flux)',
    resolution: '1024x1024 (1:1)',
    quality: 'excellent',
    url: 'https://image.pollinations.ai/prompt/ancient%20citadel%20built%20on%20a%20jagged%20mountain%20peak%2C%20a%20giant%20dragon%20soaring%20above%2C%20dramatic%20storm%20clouds%2C%20epic%20fantasy%20illustration?model=flux&width=1024&height=1024&seed=88990&nologo=true'
  },
  {
    id: 10,
    title: 'Whispering Woods',
    prompt: 'enchanted forest with bioluminescent glowing mushrooms and floating fireflies, ancient hollow tree, magical fairytale concept art',
    category: 'Fantasy',
    seed: 33445,
    model: 'Phoenix Pro (Flux)',
    resolution: '1024x1024 (1:1)',
    quality: 'excellent',
    url: 'https://image.pollinations.ai/prompt/enchanted%20forest%20with%20bioluminescent%20glowing%20mushrooms%20and%20floating%20fireflies%2C%20ancient%20hollow%20tree%2C%20magical%20fairytale%20concept%20art?model=flux&width=1024&height=1024&seed=33445&nologo=true'
  },
  // 5. Product
  {
    id: 11,
    title: 'Luxury Timepiece',
    prompt: 'studio lighting shot of a luxury black chronograph watch with gold accents, resting on a dark marble slab, professional product photography',
    category: 'Product',
    seed: 77665,
    model: 'Phoenix Pro (Flux)',
    resolution: '1024x1024 (1:1)',
    quality: 'excellent',
    url: 'https://image.pollinations.ai/prompt/studio%20lighting%20shot%20of%20a%20luxury%20black%20chronograph%20watch%20with%20gold%20accents%2C%20resting%20on%20a%20dark%20marble%20slab%2C%20professional%20product%20photography?model=flux&width=1024&height=1024&seed=77665&nologo=true'
  },
  {
    id: 12,
    title: 'Futuristic Footwear',
    prompt: 'high-end futuristic sneaker floating in mid-air, neon glowing sole, dark smoky studio background, professional advertisement photography',
    category: 'Product',
    seed: 99001,
    model: 'Phoenix Pro (Flux)',
    resolution: '1024x1024 (1:1)',
    quality: 'excellent',
    url: 'https://image.pollinations.ai/prompt/high-end%20futuristic%20sneaker%20floating%20in%20mid-air%2C%20neon%20glowing%20sole%2C%20dark%20smoky%20studio%20background%2C%20professional%20advertisement%20photography?model=flux&width=1024&height=1024&seed=99001&nologo=true'
  }
]

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null)
  const [downloadingId, setDownloadingId] = useState<number | null>(null)
  const [copiedPrompt, setCopiedPrompt] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({})

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory)

  const downloadImage = async (e: React.MouseEvent | React.TouchEvent, item: GalleryItem) => {
    e.stopPropagation()
    if (downloadingId !== null) return
    try {
      setDownloadingId(item.id)
      const response = await fetch(item.url)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      
      const sanitizedPrompt = item.prompt
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .slice(0, 40)
      link.download = `pixelforge-showcase-${sanitizedPrompt || 'image'}.jpg`
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(blobUrl)
    } catch (err) {
      console.error('Failed to download image:', err)
      window.open(item.url, '_blank')
    } finally {
      setDownloadingId(null)
    }
  }

  const handleUsePrompt = (item: GalleryItem) => {
    setActiveItem(null)
    
    // Dispatch custom event to load prompt in PromptDemo generator
    const event = new CustomEvent('use-gallery-prompt', {
      detail: {
        prompt: item.prompt,
        model: 'phoenix-pro',
        quality: 'excellent'
      }
    })
    window.dispatchEvent(event)
    
    // Scroll smoothly to generator
    const generatorElement = document.getElementById('generator')
    if (generatorElement) {
      generatorElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const copyPromptText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedPrompt(true)
      setTimeout(() => setCopiedPrompt(false), 2000)
    } catch (err) {
      console.error('Failed to copy prompt text:', err)
    }
  }

  return (
    <section id="gallery" className="relative py-20 sm:py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Showcase of</span>
            <br />
            <span className="text-gradient">Creative Excellence</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore stunning creations from our community of artists and developers.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 sm:mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 cursor-pointer ${
                selectedCategory === category
                  ? 'bg-gradient-accent text-white shadow-lg shadow-accent/30'
                  : 'border border-border hover:border-accent/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => setActiveItem(item)}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500 rounded-xl" />

              <div className="relative aspect-square bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 rounded-xl overflow-hidden group">
                {/* Image Shimmer Background */}
                {!loadedImages[item.id] && (
                  <div className="absolute inset-0 bg-gradient-to-br from-card via-muted to-background animate-shimmer" />
                )}

                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover rounded-xl transition-all duration-500 group-hover:scale-105"
                  style={{ opacity: loadedImages[item.id] ? 1 : 0 }}
                  onLoad={() => setLoadedImages(prev => ({ ...prev, [item.id]: true }))}
                />

                {/* Content overlay on Hover */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/70 backdrop-blur-sm z-20">
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-300 mb-5 line-clamp-3 leading-relaxed">"{item.prompt}"</p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveItem(item)
                      }}
                      className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleUsePrompt(item)
                      }}
                      className="px-3 py-2 rounded-lg bg-accent text-white hover:shadow-lg hover:shadow-accent/30 transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Use Prompt</span>
                    </button>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 right-3 z-10">
                  <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-[10px] font-semibold text-white uppercase tracking-wider">
                    {item.category}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-12 sm:mt-16">
          <button
            onClick={() => setSelectedCategory('All')}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 font-semibold cursor-pointer"
          >
            <span>Show All Categories</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Lightbox Details Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full rounded-2xl bg-card border border-border overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Left: Image Showcase */}
              <div className="relative aspect-square md:aspect-auto md:h-full bg-muted overflow-hidden min-h-[300px]">
                <img
                  src={activeItem.url}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-white uppercase tracking-wider">
                    {activeItem.category}
                  </span>
                </div>
              </div>

              {/* Modal Right: Technical Parameter Details */}
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-card/90">
                {/* Header info */}
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-foreground pr-8">{activeItem.title}</h3>
                    <button
                      onClick={() => setActiveItem(null)}
                      className="absolute top-4 right-4 md:static p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Prompt box */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Creation Prompt</label>
                    <div className="relative p-4 rounded-xl bg-muted/40 border border-border text-sm italic text-foreground leading-relaxed">
                      "{activeItem.prompt}"
                      <button
                        onClick={() => copyPromptText(activeItem.prompt)}
                        className="absolute bottom-2 right-2 p-1.5 rounded bg-card/80 hover:bg-card border border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        title="Copy Prompt"
                      >
                        {copiedPrompt ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Grid Metadata Parameters */}
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Generation Parameters</label>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-muted/30 border border-border/50 text-left">
                      <span className="text-[10px] text-muted-foreground block font-medium">AI Model</span>
                      <span className="text-xs font-bold text-foreground mt-0.5 block truncate">{activeItem.model}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/30 border border-border/50 text-left">
                      <span className="text-[10px] text-muted-foreground block font-medium">Seed Parameter</span>
                      <span className="text-xs font-bold text-foreground mt-0.5 block truncate">{activeItem.seed}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/30 border border-border/50 text-left">
                      <span className="text-[10px] text-muted-foreground block font-medium">Resolution Size</span>
                      <span className="text-xs font-bold text-foreground mt-0.5 block truncate">{activeItem.resolution}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/30 border border-border/50 text-left">
                      <span className="text-[10px] text-muted-foreground block font-medium">Quality Tier</span>
                      <span className="text-xs font-bold text-accent capitalize mt-0.5 block truncate">{activeItem.quality}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => handleUsePrompt(activeItem)}
                    className="flex-1 py-3.5 rounded-lg bg-gradient-accent text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent/30 transition-all cursor-pointer group text-sm"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Load in Generator</span>
                  </button>

                  <button
                    onClick={(e) => downloadImage(e, activeItem)}
                    disabled={downloadingId !== null}
                    className="px-4 py-3.5 rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 text-foreground hover:text-accent font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
                    title="Download Image File"
                  >
                    {downloadingId === activeItem.id ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
