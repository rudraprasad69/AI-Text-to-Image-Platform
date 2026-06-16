'use client'

import { Star } from 'lucide-react'

const testimonials = [
  {
    author: 'Sarah Chen',
    role: 'Creative Director',
    company: 'Design Studio Co.',
    quote: 'PixelForge has transformed how we approach visual content. It\'s intuitive, powerful, and absolutely game-changing for our workflow.',
    rating: 5,
  },
  {
    author: 'Marcus Rivera',
    role: 'Founder & CEO',
    company: 'TechVenture Labs',
    quote: 'The API is incredibly well-designed. Integration took less than an hour. Our team loves the quality and speed of image generation.',
    rating: 5,
  },
  {
    author: 'Elena Vasquez',
    role: 'Art Director',
    company: 'Creative Media Group',
    quote: 'I\'ve tried many AI image generators. PixelForge stands out for its consistency, control, and exceptional customer support.',
    rating: 5,
  },
  {
    author: 'David Kim',
    role: 'Product Manager',
    company: 'Digital Innovation Co.',
    quote: 'The batch processing capabilities have cut our production time by 70%. PixelForge is essential to our operation now.',
    rating: 5,
  },
  {
    author: 'Olivia Thompson',
    role: 'Content Creator',
    company: 'Studio Thompson',
    quote: 'Finally, an AI tool that doesn\'t feel limited. The customization options and model variety are outstanding.',
    rating: 5,
  },
  {
    author: 'James Wilson',
    role: 'Technical Lead',
    company: 'Enterprise Solutions Inc.',
    quote: 'Enterprise-grade reliability and performance. The SLA compliance and security measures gave us the confidence to scale.',
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="relative py-20 sm:py-32 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-secondary/10 -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Trusted by</span>
            <br />
            <span className="text-gradient">Thousands of Creators</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what industry professionals say about PixelForge AI.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl" />

              <div className="relative glass-card p-6 sm:p-8 h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground mb-6 flex-1 leading-relaxed italic text-sm sm:text-base">
                  &quot;{testimonial.quote}&quot;
                </p>

                {/* Author */}
                <div className="space-y-2 pt-4 border-t border-border/50">
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
