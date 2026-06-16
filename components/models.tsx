'use client'

import { Check } from 'lucide-react'

const models = [
  {
    id: 'phoenix-pro',
    name: 'Phoenix Pro',
    description: 'Lightning-fast generation with exceptional quality',
    speed: '2-3s',
    quality: '95%',
    specs: ['4K resolution', 'Real-time preview', 'Style transfer', 'Upscaling'],
    badge: 'Most Popular',
  },
  {
    id: 'quantum-ultra',
    name: 'Quantum Ultra',
    description: 'Highest quality with advanced customization',
    speed: '5-7s',
    quality: '98%',
    specs: ['8K resolution', 'Advanced controls', 'Precision tuning', 'Batch processing'],
    badge: 'Premium',
  },
  {
    id: 'nova-light',
    name: 'Nova Light',
    description: 'Optimized for speed and efficiency',
    speed: '1-2s',
    quality: '90%',
    specs: ['2K resolution', 'Fast iteration', 'Mobile optimized', 'Cost-effective'],
    badge: null,
  },
]

export function Models() {
  const handleSelectModel = (modelId: string) => {
    const event = new CustomEvent('select-generator-model', {
      detail: { model: modelId }
    })
    window.dispatchEvent(event)
    
    // Smooth scroll to generator workspace
    const generatorElement = document.getElementById('generator')
    if (generatorElement) {
      generatorElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="models" className="relative py-20 sm:py-32 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-accent/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 -translate-x-1/2 -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Choose Your</span>
            <br />
            <span className="text-gradient">AI Model</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each model is fine-tuned for different use cases and performance requirements.
          </p>
        </div>

        {/* Models grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {models.map((model, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {model.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="px-4 py-1 rounded-full bg-gradient-accent text-white text-xs font-semibold">
                    {model.badge}
                  </div>
                </div>
              )}

              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 rounded-2xl" />

              <div className="relative glass-card p-8 h-full flex flex-col">
                <div className="space-y-3 mb-8">
                  <h3 className="text-2xl font-bold text-foreground">{model.name}</h3>
                  <p className="text-muted-foreground">{model.description}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8 p-4 rounded-xl bg-muted/30 border border-border/50">
                  <div>
                    <div className="text-sm text-muted-foreground">Speed</div>
                    <div className="text-lg font-bold text-accent">{model.speed}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Quality</div>
                    <div className="text-lg font-bold text-accent">{model.quality}</div>
                  </div>
                </div>

                {/* Specs */}
                <div className="space-y-3 mb-8 flex-1">
                  {model.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-muted-foreground">{spec}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleSelectModel(model.id)}
                  className="w-full py-3 rounded-lg font-semibold transition-all duration-300 border border-border hover:border-accent/50 hover:bg-accent/10 text-foreground cursor-pointer"
                >
                  Select Model
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
