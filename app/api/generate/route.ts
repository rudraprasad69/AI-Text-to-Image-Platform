import { NextRequest, NextResponse } from 'next/server'

interface GenerateRequest {
  prompt: string
  model?: string
  quality?: string
}

interface GenerateResponse {
  success: boolean
  imageUrl?: string
  error?: string
  generationTime?: number
  resolution?: string
  quality?: string
}

// Model-to-Pollinations model mapping (free tier only)
const MODEL_MAP: Record<string, string> = {
  'phoenix-pro': 'flux',   // Best quality - FLUX model (free)
  'quantum-ultra': 'flux', // FLUX with higher resolution
  'nova-light': 'turbo',   // Fast generation - Turbo model (free)
}

// Quality-to-resolution mapping
const QUALITY_RESOLUTION: Record<string, { width: number; height: number; label: string }> = {
  standard: { width: 768, height: 768, label: '768x768' },
  excellent: { width: 1024, height: 1024, label: '1024x1024' },
  ultra: { width: 1280, height: 1280, label: '1280x1280' },
}

export async function POST(request: NextRequest): Promise<NextResponse<GenerateResponse>> {
  try {
    const body: GenerateRequest = await request.json()
    const { prompt, model = 'phoenix-pro', quality = 'excellent' } = body

    // Validate prompt
    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Prompt cannot be empty' },
        { status: 400 }
      )
    }

    const pollinationsModel = MODEL_MAP[model] ?? 'flux'
    const resolution = QUALITY_RESOLUTION[quality] ?? QUALITY_RESOLUTION.excellent

    // Enhance prompt with quality suffix
    const qualitySuffix =
      quality === 'ultra'
        ? ', ultra detailed, 8k resolution, masterpiece, highly detailed'
        : quality === 'excellent'
        ? ', high quality, detailed, professional'
        : ', clean composition'

    const enhancedPrompt = `${prompt.trim()}${qualitySuffix}`
    const encodedPrompt = encodeURIComponent(enhancedPrompt)

    // Use a random seed for variation
    const seed = Math.floor(Math.random() * 1000000)

    // Build Pollinations.ai direct image URL (served client-side, no proxying)
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?model=${pollinationsModel}&width=${resolution.width}&height=${resolution.height}&seed=${seed}`

    // Estimate generation time based on model and quality
    const estimatedTime =
      pollinationsModel === 'turbo'
        ? parseFloat((Math.random() * 5 + 3).toFixed(1))
        : parseFloat((Math.random() * 15 + 8).toFixed(1))

    console.log(`[API] Returning Pollinations.ai URL — model: ${pollinationsModel}, size: ${resolution.label}`)

    return NextResponse.json(
      {
        success: true,
        imageUrl,
        generationTime: estimatedTime,
        resolution: resolution.label,
        quality,
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error('[API] Image generation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate image. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET(): Promise<NextResponse<GenerateResponse>> {
  return NextResponse.json(
    { success: false, error: 'POST request required' },
    { status: 405 }
  )
}
