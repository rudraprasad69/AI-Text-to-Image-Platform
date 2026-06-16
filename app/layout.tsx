import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PixelForge AI - Professional Image Generation',
  description: 'Create stunning AI-generated images with PixelForge AI. Professional-grade image generation powered by advanced AI models.',
  keywords: 'AI image generation, text-to-image, AI art, creative tool, image synthesis',
  generator: 'PixelForge AI',
  openGraph: {
    title: 'PixelForge AI - Professional Image Generation',
    description: 'Create stunning AI-generated images with PixelForge AI',
    type: 'website',
  },
}

export const viewport = {
  themeColor: '#08080c',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
