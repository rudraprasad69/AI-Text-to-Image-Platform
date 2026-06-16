'use client'

import { useState } from 'react'
import { Sparkles, Zap, Palette, RefreshCw, AlertCircle } from 'lucide-react'
import { ScrollAnimate } from '@/components/scroll-animate'
import { motion } from 'framer-motion'
import { ANIMATION_DURATION } from '@/lib/animations'
import { useImageGeneration } from '@/hooks/useImageGeneration'
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
  const { isGenerating, error, result, generateImage, reset } = useImageGeneration()

  const handleGenerate = async () => {
    setImageLoaded(false)
    await generateImage(prompt, selectedModel, selectedQuality)
  }

  const handleRandomPrompt = () => {
    const random = samplePrompts[Math.floor(Math.random() * samplePrompts.length)]
    setPrompt(random)
    setImageLoaded(false)
    reset()
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
                        AI is painting your image — this may take up to 30 seconds...
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
                <div className="relative w-full h-full bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 rounded-xl flex items-center justify-center overflow-hidden group">

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
                  <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-xl z-30" />
                </div>
              </div>
            </div>

            {/* Stats — only show after image has fully loaded */}
            {imageLoaded && result && (
              <motion.div
                className="mt-4 grid grid-cols-3 gap-3 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="text-xs text-muted-foreground">Generation Time</div>
                  <div className="text-sm font-semibold text-foreground">{result.generationTime.toFixed(1)}s</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="text-xs text-muted-foreground">Resolution</div>
                  <div className="text-sm font-semibold text-foreground">{result.resolution}</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="text-xs text-muted-foreground">Quality</div>
                  <div className="text-sm font-semibold text-accent capitalize">{result.quality}</div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
