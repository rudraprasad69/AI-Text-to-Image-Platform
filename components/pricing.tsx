'use client'

import { Check, X, CreditCard, Sparkles, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { ScrollAnimate, StaggerContainer, StaggerItem } from '@/components/scroll-animate'
import { motion, AnimatePresence } from 'framer-motion'
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
    credits: '10 monthly credits',
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
    credits: '1,000 monthly credits',
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
    credits: 'Unlimited credits',
  },
]

export function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState('monthly')
  const [activePlan, setActivePlan] = useState<typeof plans[0] | null>(null)
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'payment' | 'success'>('details')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [processing, setProcessing] = useState(false)

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return
    if (activePlan?.price === 'Free') {
      handleFreeCheckout()
    } else if (activePlan?.price === 'Custom') {
      handleEnterpriseCheckout()
    } else {
      setCheckoutStep('payment')
    }
  }

  const handleFreeCheckout = async () => {
    setProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setProcessing(false)
    setCheckoutStep('success')
  }

  const handleEnterpriseCheckout = async () => {
    setProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setProcessing(false)
    setCheckoutStep('success')
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cardNumber || !cardExpiry || !cardCvc) return
    setProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setProcessing(false)
    setCheckoutStep('success')
  }

  // Credit Card fields formatter
  const onCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const parts = []
    for (let i = 0; i < value.length; i += 4) {
      parts.push(value.substring(i, i + 4))
    }
    setCardNumber(parts.length > 0 ? parts.join(' ').slice(0, 19) : value)
  }

  const onExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (value.length >= 2) {
      setCardExpiry(`${value.slice(0, 2)}/${value.slice(2, 4)}`.slice(0, 5))
    } else {
      setCardExpiry(value)
    }
  }

  const onCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardCvc(e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '').slice(0, 4))
  }

  // Card brand detector
  const getCardBrand = () => {
    const num = cardNumber.replace(/\s/g, '')
    if (num.startsWith('4')) return 'Visa'
    if (num.startsWith('5')) return 'Mastercard'
    return 'Unknown'
  }

  const isDetailsValid = name.trim().length > 0 && email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  const isPaymentValid = cardNumber.replace(/\s/g, '').length === 16 && cardExpiry.length === 5 && cardCvc.length >= 3

  const getComputedPrice = (plan: typeof plans[0]) => {
    if (plan.price === 'Free' || plan.price === 'Custom') return plan.price
    if (billingPeriod === 'annual') {
      const priceVal = parseInt(plan.price.replace('$', ''), 10)
      const discounted = Math.round(priceVal * 0.8)
      return `$${discounted}`
    }
    return plan.price
  }

  const getBillingLabel = (plan: typeof plans[0]) => {
    if (plan.price === 'Free') return 'Forever'
    if (plan.price === 'Custom') return 'Billed annually'
    return billingPeriod === 'annual' ? '/month (billed annually)' : '/month'
  }

  const closeCheckout = () => {
    setActivePlan(null)
    setCheckoutStep('details')
  }

  const handleSuccessClose = () => {
    closeCheckout()
    // Smooth scroll to generator
    const generatorElement = document.getElementById('generator')
    if (generatorElement) {
      generatorElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

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
              className="relative w-14 h-8 bg-muted rounded-full border border-border transition-all duration-300 hover:border-accent/50 cursor-pointer"
            >
              <div className={`absolute top-1 w-6 h-6 bg-gradient-accent rounded-full transition-transform duration-300 ${billingPeriod === 'annual' ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-medium transition-colors ${billingPeriod === 'annual' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual <span className="text-xs text-accent ml-1 font-bold">Save 20%</span>
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
                  <div className="absolute -inset-1 bg-gradient-accent opacity-30 blur-2xl rounded-2xl animate-pulse" />
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
                    <span className="text-4xl font-bold text-gradient">{getComputedPrice(plan)}</span>
                    <span className="text-muted-foreground text-sm">{getBillingLabel(plan)}</span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    setActivePlan(plan)
                    setCheckoutStep('details')
                    setName('')
                    setEmail('')
                    setCardNumber('')
                    setCardExpiry('')
                    setCardCvc('')
                  }}
                  className={`w-full py-3 rounded-lg font-semibold mb-8 transition-all duration-300 cursor-pointer ${
                    plan.highlight
                      ? 'bg-gradient-accent text-white hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5'
                      : 'border border-border hover:border-accent/50 hover:bg-accent/5 text-foreground'
                  }`}
                >
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
          <a href="#pricing" className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors">
            <span>View detailed comparison</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Checkout Modal Dialog */}
      <AnimatePresence>
        {activePlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={closeCheckout}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative max-w-md w-full bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeCheckout}
                className="absolute top-4 right-4 p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <AnimatePresence mode="wait">
                {/* STEP 1: Details form */}
                {checkoutStep === 'details' && (
                  <motion.div
                    key="details-step"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Configure Subscription</h3>
                      <p className="text-xs text-muted-foreground mt-1">Please enter your profile details below</p>
                    </div>

                    {/* Plan summary info */}
                    <div className="p-4 rounded-xl bg-muted/40 border border-border flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Selected Plan</span>
                        <h4 className="text-base font-bold text-foreground">{activePlan.name}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gradient block">{getComputedPrice(activePlan)}</span>
                        <span className="text-[10px] text-muted-foreground">{getBillingLabel(activePlan)}</span>
                      </div>
                    </div>

                    <form onSubmit={handleNextStep} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block">Full Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. John Doe"
                          className="w-full bg-input border border-border rounded-lg px-3.5 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. johndoe@example.com"
                          className="w-full bg-input border border-border rounded-lg px-3.5 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={!isDetailsValid || processing}
                        className="w-full py-3 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg hover:shadow-accent/20 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {processing ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : activePlan.price === 'Free' || activePlan.price === 'Custom' ? (
                          'Complete Order'
                        ) : (
                          'Proceed to Payment'
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* STEP 2: Payment forms with CC simulator */}
                {checkoutStep === 'payment' && (
                  <motion.div
                    key="payment-step"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Secure Payment</h3>
                      <p className="text-xs text-muted-foreground mt-1">Payment processed over SSL bank encryption</p>
                    </div>

                    {/* Virtual card simulator */}
                    <div className="relative aspect-[1.58/1] w-full rounded-2xl p-6 bg-gradient-to-br from-primary/80 via-accent/80 to-secondary/80 text-white shadow-xl flex flex-col justify-between overflow-hidden border border-white/10">
                      <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
                      <div className="relative z-10 flex justify-between items-start">
                        <div className="space-y-0.5">
                          <span className="text-[8px] font-bold text-white/60 tracking-widest uppercase">PixelForge Card</span>
                          <h4 className="text-xs font-semibold uppercase tracking-wider">{name || 'Cardholder Name'}</h4>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-extrabold tracking-wider italic text-white/90">
                            {getCardBrand() !== 'Unknown' ? getCardBrand() : 'Credit'}
                          </span>
                        </div>
                      </div>

                      <div className="relative z-10 text-xl font-mono tracking-widest text-center py-4">
                        {cardNumber || '•••• •••• •••• ••••'}
                      </div>

                      <div className="relative z-10 flex justify-between items-center text-[10px]">
                        <div>
                          <span className="text-[6px] font-bold text-white/50 uppercase block">Expires</span>
                          <span className="font-semibold text-white/90">{cardExpiry || 'MM/YY'}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[6px] font-bold text-white/50 uppercase block">CVC</span>
                          <span className="font-semibold text-white/90">{cardCvc || '•••'}</span>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block">Card Number</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={cardNumber}
                            onChange={onCardNumberChange}
                            placeholder="4000 1234 5678 9010"
                            className="w-full bg-input border border-border rounded-lg pl-10 pr-3.5 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200"
                          />
                          <CreditCard className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block">Expiry Date</label>
                          <input
                            type="text"
                            required
                            value={cardExpiry}
                            onChange={onExpiryChange}
                            placeholder="MM/YY"
                            className="w-full bg-input border border-border rounded-lg px-3.5 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200 text-center"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block">CVC Code</label>
                          <input
                            type="password"
                            required
                            value={cardCvc}
                            onChange={onCvcChange}
                            placeholder="•••"
                            className="w-full bg-input border border-border rounded-lg px-3.5 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200 text-center"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setCheckoutStep('details')}
                          className="flex-1 py-3 border border-border text-foreground hover:bg-muted text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={!isPaymentValid || processing}
                          className="flex-[2] py-3 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg hover:shadow-accent/20 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {processing ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Charging...</span>
                            </>
                          ) : (
                            `Pay ${getComputedPrice(activePlan)}`
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* STEP 3: Success Screen */}
                {checkoutStep === 'success' && (
                  <motion.div
                    key="success-step"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-6 space-y-6"
                  >
                    <div className="relative w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/10">
                      <Sparkles className="w-10 h-10 text-green-400" />
                      <div className="absolute inset-0 bg-green-500/5 rounded-full animate-ping" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-foreground">Order Activated!</h3>
                      <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                        Thank you for subscribing, {name}! Your account is configured and credentials are set.
                      </p>
                    </div>

                    {/* Credit Allocation Info */}
                    <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 max-w-xs mx-auto">
                      <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider block">Allocated Resources</span>
                      <span className="text-lg font-bold text-foreground block capitalize mt-0.5">{activePlan.credits}</span>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={handleSuccessClose}
                        className="w-full py-3.5 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg hover:shadow-accent/20 transition-all text-sm cursor-pointer"
                      >
                        Start Creating Masterpieces
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
