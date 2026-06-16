'use client'

import { Check } from 'lucide-react'
import { useState } from 'react'
import { ScrollAnimate, StaggerContainer, StaggerItem } from '@/components/scroll-animate'
import { motion } from 'framer-motion'
import { HOVER_LIFT, HOVER_GLOW } from '@/lib/animations'

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for exploring and learning',
    price: 'Free',
    period: 'Forever',
    features: [
      { label: '10 images/month', included: true },
      { label: 'Standard quality', included: true },
      { label: 'Community support', included: true },
      { label: 'API access', included: false },
      { label: 'Priority support', included: false },
      { label: 'Custom models', included: false },
    ],
    cta: 'Start Free',
    highlight: false,
  },
  {
    name: 'Professional',
    description: 'For serious creators and developers',
    price: '$49',
    period: '/month',
    features: [
      { label: '1,000 images/month', included: true },
      { label: 'Premium quality', included: true },
      { label: 'Email support', included: true },
      { label: 'Full API access', included: true },
      { label: 'Priority support', included: true },
      { label: 'Custom models', included: false },
    ],
    cta: 'Get Started',
    highlight: true,
  },
  {
    name: 'Enterprise',
    description: 'For large-scale production use',
    price: 'Custom',
    period: 'Per year',
    features: [
      { label: 'Unlimited images', included: true },
      { label: 'Enterprise quality', included: true },
      { label: '24/7 support', included: true },
      { label: 'Advanced API', included: true },
      { label: 'Dedicated support', included: true },
      { label: 'Custom models & SLA', included: true },
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
]

export function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState('monthly')

  return (
    <section id="pricing" className="relative py-20 sm:py-32 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 via-transparent to-primary/10 -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Simple, Transparent</span>
            <br />
            <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your needs. Always transparent, no hidden fees.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium transition-colors ${billingPeriod === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
              className="relative w-14 h-8 bg-muted rounded-full border border-border transition-all duration-300 hover:border-accent/50"
            >
              <div className={`absolute top-1 w-6 h-6 bg-gradient-accent rounded-full transition-transform duration-300 ${billingPeriod === 'annual' ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-medium transition-colors ${billingPeriod === 'annual' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual <span className="text-xs text-accent ml-1">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <StaggerItem
              key={index}
              className={`group relative transition-all duration-300 ${plan.highlight ? '-translate-y-4 md:col-span-1' : ''}`}
            >
              {plan.highlight && (
                <>
                  <div className="absolute -inset-1 bg-gradient-accent opacity-30 blur-2xl rounded-2xl" />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1 rounded-full bg-gradient-accent text-white text-xs font-semibold">
                      RECOMMENDED
                    </div>
                  </div>
                </>
              )}

              <motion.div
                className={`relative glass-card p-8 h-full flex flex-col rounded-2xl border ${plan.highlight ? 'border-accent/50' : 'border-border'}`}
                whileHover={plan.highlight ? { ...HOVER_GLOW.whileHover, y: -12 } : { y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="space-y-2 mb-6">
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gradient">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                </div>

                {/* CTA */}
                <button className={`w-full py-3 rounded-lg font-semibold mb-8 transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-gradient-accent text-white hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5'
                    : 'border border-border hover:border-accent/50 hover:bg-accent/5 text-foreground'
                }`}>
                  {plan.cta}
                </button>

                {/* Features list */}
                <div className="space-y-4 flex-1">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                        feature.included ? 'bg-accent/20 border border-accent' : 'bg-muted border border-border'
                      }`}>
                        {feature.included && <Check className="w-3 h-3 text-accent" />}
                      </div>
                      <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            All plans include 14-day free trial. No credit card required.
          </p>
          <a href="#" className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors">
            <span>View detailed comparison</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
