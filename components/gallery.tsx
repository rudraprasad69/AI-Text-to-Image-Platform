'use client'

import { useState } from 'react'

const categories = ['All', 'Landscape', 'Portrait', 'Abstract', 'Fantasy', 'Product']

// Use a seeded approach instead of Math.random() to avoid hydration mismatch
const categoryMapping = {
  0: 'Landscape',
  1: 'Portrait',
  2: 'Abstract',
  3: 'Fantasy',
  4: 'Product',
  5: 'Landscape',
  6: 'Abstract',
  7: 'Portrait',
  8: 'Fantasy',
  9: 'Product',
  10: 'Landscape',
  11: 'Abstract',
}

const galleryItems = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  category: categoryMapping[i as keyof typeof categoryMapping],
  title: `Creation ${i + 1}`,
  prompt: 'A beautiful AI-generated image',
}))

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory)

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
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
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
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500 rounded-xl" />

              <div className="relative aspect-square bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 rounded-xl overflow-hidden group">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-card via-muted to-background animate-pulse" />

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-200 mb-4">{item.prompt}</p>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all text-xs font-medium">
                      View
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-accent text-white hover:shadow-lg hover:shadow-accent/30 transition-all text-xs font-medium">
                      Use Prompt
                    </button>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 right-3 z-10">
                  <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-xs font-medium text-white">
                    {item.category}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-12 sm:mt-16">
          <button className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 font-medium">
            <span>View All Creations</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
