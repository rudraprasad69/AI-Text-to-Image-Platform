'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Sparkles,
  Zap,
  Palette,
  RefreshCw,
  AlertCircle,
  SlidersHorizontal,
  Download,
  Share2,
  Copy,
  Check,
  Trash2,
  History,
  ExternalLink
} from 'lucide-react'
import { ScrollAnimate } from '@/components/scroll-animate'
import { motion } from 'framer-motion'
import { ANIMATION_DURATION } from '@/lib/animations'
import { useImageGeneration, GenerationResult } from '@/hooks/useImageGeneration'
import { GENERATION_MODELS } from '@/lib/api-config'

const samplePrompts = [
  'A serene Japanese garden with cherry blossoms and koi pond at sunset',
  'Cyberpunk neon city street with flying vehicles and holographic signs',
  'Abstract geometric shapes flowing through liquid gold and silver',
  'A majestic mountain landscape with aurora borealis in the night sky',
]

export function PromptDemo() {
  const [prompt, setPrompt] = useState(samplePrompts[0])
  const [selectedModel, setSelectedModel] = useState<string>('phoenix-pro')
  const [selectedQuality, setSelectedQuality] = useState<string>('excellent')
  const [imageLoaded, setImageLoaded] = useState(false)
  
  // Advanced options state
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [aspectRatio, setAspectRatio] = useState('1:1')
  const [customSeed, setCustomSeed] = useState<string>('')
  const [enhance, setEnhance] = useState(true)

  // History states
  const [history, setHistory] = useState<GenerationResult[]>([])
  const [downloading, setDownloading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [copiedShare, setCopiedShare] = useState(false)

  const { isGenerating, error, result, generateImage, reset, setResult } = useImageGeneration()

  // Load history from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pixelforge_history')
      if (saved) {
        try {
          setHistory(JSON.parse(saved))
        } catch (e) {
          console.error('Failed to parse history:', e)
        }
      }
    }
  }, [])

  // Helper to save history
  const saveHistory = (newHistory: GenerationResult[]) => {
    setHistory(newHistory)
    localStorage.setItem('pixelforge_history', JSON.stringify(newHistory))
  }

  const handleGenerate = async () => {
    setImageLoaded(false)
    const newRes = await generateImage(prompt, selectedModel, selectedQuality, {
      aspectRatio,
      seed: customSeed ? parseInt(customSeed, 10) : undefined,
      enhance,
    })

    if (newRes) {
      // Add to local history list (limit to 12 items)
      const updatedHistory = [
        newRes,
        ...history.filter((item) => item.imageUrl !== newRes.imageUrl),
      ].slice(0, 12)
      saveHistory(updatedHistory)
    }
  }

  const handleRandomPrompt = () => {
    const random = samplePrompts[Math.floor(Math.random() * samplePrompts.length)]
    setPrompt(random)
    setImageLoaded(false)
    reset()
  }

  const loadHistoryItem = (item: GenerationResult) => {
    if (isGenerating) return
    setPrompt(item.prompt)
    setSelectedModel(item.model)
    setSelectedQuality(item.quality)
    setAspectRatio(item.aspectRatio)
    setCustomSeed(item.seed.toString())
    setImageLoaded(false)
    setResult(item)
  }

  const deleteHistoryItem = (e: React.MouseEvent, indexToDelete: number) => {
    e.stopPropagation()
    const updatedHistory = history.filter((_, idx) => idx !== indexToDelete)
    saveHistory(updatedHistory)
  }

  const clearHistory = () => {
    saveHistory([])
  }

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy prompt:', err)
    }
  }

  const downloadImage = async (url: string, promptText: string) => {
    if (downloading) return
    try {
      setDownloading(true)
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      
      const sanitizedPrompt = promptText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .slice(0, 40)
      link.download = `pixelforge-${sanitizedPrompt || 'image'}.jpg`
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(blobUrl)
    } catch (err) {
      console.error('Failed to download image:', err)
      window.open(url, '_blank')
    } finally {
      setDownloading(false)
    }
  }

  const shareImage = async (url: string, promptText: string) => {
    const shareText = `Check out this AI image generated on PixelForge: "${promptText}"`
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'PixelForge AI Creation',
          text: shareText,
          url: url,
        })
      } catch (err) {
        console.log('Share canceled or failed:', err)
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        setCopiedShare(true)
        setTimeout(() => setCopiedShare(false), 2000)
      } catch (err) {
        console.error('Clipboard copy failed:', err)
      }
    }
  }

  return (
    <section className="relative py-20 sm:py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-primary/5 -z-10" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">See It In Action</span>
            <br />
            <span className="text-gradient">Try Our Prompt Demo</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Enter any text prompt and watch as PixelForge transforms it into stunning imagery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input side */}
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500 rounded-2xl" />

              <div className="relative glass-card p-6 sm:p-8 rounded-2xl border border-border/50">
                <div className="space-y-4">
                  {/* Label */}
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    <label className="text-sm font-semibold text-foreground">
                      Describe Your Vision
                    </label>
                  </div>

                  {/* Textarea */}
                  <motion.textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isGenerating}
                    className="w-full min-h-32 bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all duration-200 resize-none disabled:opacity-50"
                    placeholder="Describe the image you want to create..."
                    whileFocus={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' }}
                  />

                  {/* Error message */}
                  {error && (
                    <motion.div
                      className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <p className="text-sm">{error}</p>
                    </motion.div>
                  )}

                  {/* Model selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Select Model:</label>
                    <div className="flex gap-2">
                      {Object.values(GENERATION_MODELS).map((model) => (
                        <motion.button
                          key={model.id}
                          onClick={() => setSelectedModel(model.id)}
                          className={`px-3 py-1.5 text-xs rounded-lg border transition-all duration-200 ${
                            selectedModel === model.id
                              ? 'border-accent/50 bg-accent/10 text-foreground'
                              : 'border-border/50 text-muted-foreground hover:border-accent/30'
                          }`}
                          disabled={isGenerating}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {model.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Quality selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Quality:</label>
                    <div className="flex gap-2">
                      {['standard', 'excellent', 'ultra'].map((q) => (
                        <motion.button
                          key={q}
                          onClick={() => setSelectedQuality(q)}
                          className={`px-3 py-1.5 text-xs rounded-lg border transition-all duration-200 ${
                            selectedQuality === q
                              ? 'border-accent/50 bg-accent/10 text-foreground'
                              : 'border-border/50 text-muted-foreground hover:border-accent/30'
                          }`}
                          disabled={isGenerating}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {q.charAt(0).toUpperCase() + q.slice(1)}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Quick prompts */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Quick examples:</p>
                    <div className="flex flex-wrap gap-2">
                      {samplePrompts.slice(1, 3).map((p, i) => (
                        <motion.button
                          key={i}
                          onClick={() => setPrompt(p)}
                          disabled={isGenerating}
                          className="px-3 py-1.5 text-xs rounded-lg border border-border/50 hover:border-accent/50 hover:bg-accent/10 transition-all duration-200 text-muted-foreground hover:text-foreground disabled:opacity-50"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {p.slice(0, 30)}...
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Advanced Settings Accordion */}
                  <div className="border border-border/50 rounded-xl overflow-hidden bg-card/30">
                    <button
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="w-full flex items-center justify-between p-4 text-xs font-semibold text-foreground hover:bg-muted/30 transition-colors focus:outline-none"
                      disabled={isGenerating}
                    >
                      <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-accent" />
                        <span>Advanced Parameters</span>
                      </div>
                      <motion.span
                        animate={{ rotate: showAdvanced ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[10px] text-muted-foreground"
                      >
                        ▶
                      </motion.span>
                    </button>
                    
                    <motion.div
                      initial={false}
                      animate={{ height: showAdvanced ? 'auto' : 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 border-t border-border/50 space-y-4 bg-muted/10">
                        {/* Aspect Ratio */}
                        <div className="space-y-2">
                          <label className="text-[11px] font-medium text-muted-foreground block">Aspect Ratio</label>
                          <div className="grid grid-cols-4 gap-2">
                            {[
                              { id: '1:1', label: '1:1 Square', icon: '■' },
                              { id: '16:9', label: '16:9 Wide', icon: '▭' },
                              { id: '9:16', label: '9:16 Tall', icon: '▯' },
                              { id: '4:3', label: '4:3 Classic', icon: '▤' }
                            ].map((ratio) => (
                              <button
                                type="button"
                                key={ratio.id}
                                onClick={() => setAspectRatio(ratio.id)}
                                className={`py-2 px-1 text-[10px] rounded-lg border flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                                  aspectRatio === ratio.id
                                    ? 'border-accent/50 bg-accent/10 text-foreground'
                                    : 'border-border/50 text-muted-foreground hover:border-accent/30'
                                }`}
                                disabled={isGenerating}
                              >
                                <span className="text-sm font-normal">{ratio.icon}</span>
                                <span className="font-semibold">{ratio.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Seed Input */}
                        <div className="space-y-2">
                          <label className="text-[11px] font-medium text-muted-foreground block">Custom Seed (Optional)</label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={customSeed}
                              onChange={(e) => setCustomSeed(e.target.value)}
                              placeholder="e.g. 42, 123456 (Random if blank)"
                              disabled={isGenerating}
                              className="flex-1 bg-input border border-border rounded-lg px-3 py-1.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all duration-200"
                            />
                            {customSeed && (
                              <button
                                type="button"
                                onClick={() => setCustomSeed('')}
                                className="px-2.5 py-1.5 text-xs rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-accent/30 transition-colors"
                                disabled={isGenerating}
                              >
                                Clear
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Enhance Prompt Toggle */}
                        <div className="flex items-center justify-between pt-1">
                          <div className="space-y-0.5">
                            <label className="text-[11px] font-medium text-muted-foreground">Smart Prompt Enhancement</label>
                            <p className="text-[10px] text-muted-foreground">Automatically inject style modifiers for photorealism and detail.</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setEnhance(!enhance)}
                            className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none flex items-center ${
                              enhance ? 'bg-accent' : 'bg-border'
                            }`}
                            disabled={isGenerating}
                          >
                            <motion.div
                              layout
                              className="w-4 h-4 rounded-full bg-white"
                              animate={{ x: enhance ? 16 : 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <motion.button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="flex-1 py-3 rounded-lg bg-gradient-accent text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group"
                      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.4)' }}
                      whileTap={{ y: 0, scale: 0.98 }}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          Generating AI Image...
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          Generate Image
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      onClick={handleRandomPrompt}
                      disabled={isGenerating}
                      className="px-4 py-3 rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 disabled:opacity-50"
                      title="Try a random prompt"
                      whileHover={{ rotate: 180, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <RefreshCw className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Info */}
                  <div className="pt-2 text-xs text-muted-foreground">
                    {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        AI is painting your image — this may take up to 15 seconds...
                      </span>
                    ) : (
                      'Powered by real AI. Enter a prompt and click Generate Image.'
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview side */}
          <div className="flex flex-col justify-start">
            <div className="relative group h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-secondary via-accent to-primary opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500 rounded-2xl" />

              <div className="relative glass-card p-2 rounded-2xl border border-border/50 h-96">
                <div className="relative w-full h-full bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 rounded-xl flex items-center justify-center overflow-hidden">

                  {/* Shimmer: show while generating OR while browser is loading the image */}
                  {(isGenerating || (result?.imageUrl && !imageLoaded)) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-muted via-card to-muted animate-shimmer rounded-xl z-10" />
                  )}

                  {/* Generated image — always in DOM once URL exists, fades in on load */}
                  {result?.imageUrl && (
                    <img
                      key={result.imageUrl}
                      src={result.imageUrl}
                      alt="AI Generated image"
                      className="absolute inset-0 w-full h-full object-cover rounded-xl z-20"
                      style={{
                        opacity: imageLoaded ? 1 : 0,
                        transition: 'opacity 0.6s ease',
                      }}
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageLoaded(true)}
                    />
                  )}

                  {/* Floating Action Buttons overlay (only when image is loaded) */}
                  {result?.imageUrl && imageLoaded && (
                    <div className="absolute top-4 right-4 flex gap-2 z-40">
                      <motion.button
                        onClick={() => downloadImage(result.imageUrl, result.prompt)}
                        disabled={downloading}
                        className="p-2.5 rounded-lg bg-black/70 hover:bg-black/90 text-white border border-white/10 hover:border-white/20 backdrop-blur-md shadow-lg transition-all duration-200 cursor-pointer"
                        title="Download Image"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {downloading ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                      </motion.button>

                      <motion.button
                        onClick={() => shareImage(result.imageUrl, result.prompt)}
                        className="p-2.5 rounded-lg bg-black/70 hover:bg-black/90 text-white border border-white/10 hover:border-white/20 backdrop-blur-md shadow-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                        title={copiedShare ? "Link Copied!" : "Copy URL / Share creation"}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {copiedShare ? (
                          <>
                            <Check className="w-4 h-4 text-green-400 animate-pulse" />
                            <span className="text-[10px] font-semibold text-green-400 px-0.5">Copied!</span>
                          </>
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                      </motion.button>
                    </div>
                  )}

                  {/* Placeholder: only show when no result yet and not generating */}
                  {!result?.imageUrl && !isGenerating && (
                    <motion.div
                      className="text-center space-y-4 z-10 p-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/50 mx-auto flex items-center justify-center">
                        <Palette className="w-8 h-8 text-accent" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Your image will appear here</p>
                        <p className="text-xs text-muted-foreground">Generate with the button on the left</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-accent opacity-0 hover:opacity-5 transition-opacity duration-500 rounded-xl z-30 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Stats — only show after image has fully loaded */}
            {imageLoaded && result && (
              <motion.div
                className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="text-xs text-muted-foreground">Time</div>
                  <div className="text-sm font-semibold text-foreground">{result.generationTime.toFixed(1)}s</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="text-xs text-muted-foreground">Resolution</div>
                  <div className="text-sm font-semibold text-foreground whitespace-nowrap overflow-hidden text-ellipsis">
                    {result.resolution.split(' ')[0]}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="text-xs text-muted-foreground">Quality</div>
                  <div className="text-sm font-semibold text-accent capitalize">{result.quality}</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border border-border relative group/seed">
                  <div className="text-xs text-muted-foreground">Seed</div>
                  <div className="text-sm font-semibold text-foreground flex items-center justify-center gap-1">
                    <span>{result.seed}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(result.seed.toString())}
                      className="opacity-0 group-hover/seed:opacity-100 transition-opacity text-muted-foreground hover:text-foreground cursor-pointer"
                      title="Copy seed"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* History Gallery Section */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 pt-12 border-t border-border/40"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-accent" />
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">Recent Creations</h3>
              </div>
              <button
                onClick={clearHistory}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-red-400 border border-border/50 hover:border-red-500/20 hover:bg-red-500/5 rounded-lg transition-all duration-200 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {history.map((item, idx) => (
                <motion.div
                  key={item.timestamp + idx}
                  className="group relative bg-muted/20 border border-border/50 rounded-xl overflow-hidden cursor-pointer hover:border-accent/50 transition-all duration-300 flex flex-col"
                  onClick={() => loadHistoryItem(item)}
                  whileHover={{ y: -4, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
                >
                  {/* Image wrapper */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                    <img
                      src={item.imageUrl}
                      alt={item.prompt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Dark overlay with actions on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 z-30">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          downloadImage(item.imageUrl, item.prompt)
                        }}
                        className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors cursor-pointer"
                        title="Download"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          shareImage(item.imageUrl, item.prompt)
                        }}
                        className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors cursor-pointer"
                        title="Copy Share Link"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => deleteHistoryItem(e, idx)}
                        className="p-1.5 rounded-md bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/20 backdrop-blur-sm transition-colors cursor-pointer"
                        title="Delete from history"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Metadata info */}
                  <div className="p-3 flex-1 flex flex-col justify-between space-y-2 bg-card/40">
                    <div className="line-clamp-2 text-xs font-semibold text-foreground leading-snug group-hover:text-accent transition-colors">
                      {item.prompt}
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5 justify-between items-center text-[10px] text-muted-foreground pt-1 border-t border-border/20">
                      <span className="bg-accent/10 text-accent/80 px-1.5 py-0.5 rounded capitalize font-semibold">
                        {item.aspectRatio}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          copyToClipboard(item.prompt, idx)
                        }}
                        className="hover:text-foreground flex items-center gap-1 transition-colors cursor-pointer"
                        title="Copy prompt"
                      >
                        {copiedIndex === idx ? (
                          <Check className="w-3 h-3 text-green-400 animate-pulse" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
