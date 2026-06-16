import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { PromptDemo } from '@/components/prompt-demo'
import { Models } from '@/components/models'
import { Pricing } from '@/components/pricing'
import { Gallery } from '@/components/gallery'
import { Testimonials } from '@/components/testimonials'
import { CTA, Footer } from '@/components/footer'

export default function Page() {
  return (
    <main className="w-full overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <PromptDemo />
      <Models />
      <Pricing />
      <Gallery />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
