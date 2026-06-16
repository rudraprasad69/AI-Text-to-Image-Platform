import { NextResponse } from 'next/server'
import { GENERATION_MODELS } from '@/lib/api-config'

export async function GET() {
  try {
    const models = Object.values(GENERATION_MODELS).map((model) => ({
      id: model.id,
      name: model.name,
      description: model.description,
      qualityLevel: model.qualityLevel,
      speedLevel: model.speedLevel,
      costPerImage: model.costPerImage,
    }))

    return NextResponse.json(
      {
        success: true,
        models,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[API] Models fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch models' },
      { status: 500 }
    )
  }
}
