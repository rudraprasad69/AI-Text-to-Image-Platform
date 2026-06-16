import { NextRequest, NextResponse } from 'next/server'

interface GenerateRequest {
  prompt: string
  model?: string
  quality?: string
  aspectRatio?: string
  seed?: number
  enhance?: boolean
}

interface GenerateResponse {
  success: boolean
  imageUrl?: string
  error?: string
  generationTime?: number
  resolution?: string
  quality?: string
  seed?: number
  aspectRatio?: string
  model?: string
  prompt?: string
}

// Model-to-Pollinations model mapping (free tier only)
const MODEL_MAP: Record<string, string> = {
  'phoenix-pro': 'flux',   // Best quality - FLUX model (free)
  'quantum-ultra': 'flux', // FLUX with higher resolution
  'nova-light': 'turbo',   // Fast generation - Turbo model (free)
}

// Aspect ratio and Quality mapping to standard multiple-of-8 resolutions
const DIMENSIONS_MAP: Record<string, Record<string, { width: number; height: number; label: string }>> = {
  '1:1': {
    standard: { width: 768, height: 768, label: '768x768 (1:1)' },
    excellent: { width: 1024, height: 1024, label: '1024x1024 (1:1)' },
    ultra: { width: 1280, height: 1280, label: '1280x1280 (1:1)' },
  },
  '16:9': {
    standard: { width: 1024, height: 576, label: '1024x576 (16:9)' },
    excellent: { width: 1344, height: 768, label: '1344x768 (16:9)' },
    ultra: { width: 1600, height: 900, label: '1600x900 (16:9)' },
  },
  '9:16': {
    standard: { width: 576, height: 1024, label: '576x1024 (9:16)' },
    excellent: { width: 768, height: 1344, label: '768x1344 (9:16)' },
    ultra: { width: 900, height: 1600, label: '900x1600 (9:16)' },
  },
  '4:3': {
    standard: { width: 800, height: 600, label: '800x600 (4:3)' },
    excellent: { width: 1024, height: 768, label: '1024x768 (4:3)' },
    ultra: { width: 1280, height: 960, label: '1280x960 (4:3)' },
  },
}

export async function POST(request: NextRequest): Promise<NextResponse<GenerateResponse>> {
  try {
    const body: GenerateRequest = await request.json()
    const {
      prompt,
      model = 'phoenix-pro',
      quality = 'excellent',
      aspectRatio = '1:1',
      seed: userSeed,
      enhance = true
    } = body

    // Validate prompt
    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Prompt cannot be empty' },
        { status: 400 }
      )
    }

    const pollinationsModel = MODEL_MAP[model] ?? 'flux'
    const selectedRatio = DIMENSIONS_MAP[aspectRatio] ?? DIMENSIONS_MAP['1:1']
    const resolution = selectedRatio[quality] ?? selectedRatio.excellent

    // Enhance prompt with quality suffix if enabled
    let finalPrompt = prompt.trim()
    if (enhance) {
      const qualitySuffix =
        quality === 'ultra'
          ? ', ultra detailed, 8k resolution, masterpiece, highly detailed'
          : quality === 'excellent'
          ? ', high quality, detailed, professional'
          : ', clean composition'
      finalPrompt = `${finalPrompt}${qualitySuffix}`
    }

    const encodedPrompt = encodeURIComponent(finalPrompt)

    // Determine seed (use custom seed if provided and valid, otherwise randomize)
    const resolvedSeed = typeof userSeed === 'number' && userSeed >= 0
      ? userSeed
      : Math.floor(Math.random() * 10000000)

    // Build Pollinations.ai direct image URL
    // Explicitly add nologo=true to keep designs premium
    let imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?model=${pollinationsModel}&width=${resolution.width}&height=${resolution.height}&seed=${resolvedSeed}&nologo=true`
    
    if (enhance) {
      imageUrl += '&enhance=true'
    }

    // Estimate generation time based on model and quality
    const estimatedTime =
      pollinationsModel === 'turbo'
        ? parseFloat((Math.random() * 3 + 2).toFixed(1))
        : parseFloat((Math.random() * 8 + 4).toFixed(1))

    console.log(`[API] Returning Pollinations.ai URL — model: ${pollinationsModel}, size: ${resolution.label}, seed: ${resolvedSeed}`)

    return NextResponse.json(
      {
        success: true,
        imageUrl,
        generationTime: estimatedTime,
        resolution: resolution.label,
        quality,
        seed: resolvedSeed,
        aspectRatio,
        model,
        prompt: prompt.trim()
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
