'use client'

import { Zap, Palette, Workflow, Shield, Brain, Layers } from 'lucide-react'
import { ScrollAnimate, StaggerContainer, StaggerItem } from '@/components/scroll-animate'
import { HOVER_LIFT } from '@/lib/animations'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Brain,
    title: 'Advanced AI Models',
    description: 'Powered by state-of-the-art machine learning models trained on millions of images.',
    gradient: 'from-primary/20 to-primary/5',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate stunning images in seconds with our optimized inference pipeline.',
    gradient: 'from-accent/20 to-accent/5',
  },
  {
    icon: Palette,
    title: 'Infinite Styles',
    description: 'Explore countless artistic styles, from photorealistic to abstract masterpieces.',
    gradient: 'from-secondary/20 to-secondary/5',
  },
  {
    icon: Workflow,
    title: 'Seamless Integration',
    description: 'Connect with your favorite tools via our comprehensive API and webhooks.',
    gradient: 'from-primary/20 to-secondary/5',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption with compliance to GDPR, HIPAA, and SOC 2 standards.',
    gradient: 'from-accent/20 to-secondary/5',
  },
  {
    icon: Layers,
    title: 'Batch Processing',
    description: 'Generate hundreds of images simultaneously with our batch API endpoint.',
    gradient: 'from-secondary/20 to-accent/5',
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-32 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <ScrollAnimate variant="fadeIn" className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Powerful Features for</span>
            <br />
            <span className="text-gradient">Professional Creators</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create, customize, and deploy AI-generated images at scale.
          </p>
        </ScrollAnimate>

        {/* Features grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <StaggerItem key={index} className="group relative">
                <motion.div
                  {...HOVER_LIFT}
                  className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl"
                />

                <motion.div
                  className="relative glass-card p-8 h-full"
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-50 rounded-2xl`} />

                  <div className="relative z-10 space-y-4">
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>

                    <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

                    <motion.div
                      className="pt-4 flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ x: 4 }}
                    >
                      <span className="text-sm font-medium">Learn more</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
