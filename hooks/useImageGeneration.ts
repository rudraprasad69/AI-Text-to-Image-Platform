import { useState, useCallback } from 'react'
import { API_ENDPOINTS, GENERATION_TIMEOUTS } from '@/lib/api-config'

export interface GenerationResult {
  imageUrl: string
  generationTime: number
  resolution: string
  quality: string
  seed: number
  aspectRatio: string
  model: string
  prompt: string
  timestamp: number
}

export interface GenerationConfig {
  aspectRatio?: string
  seed?: number
  enhance?: boolean
}

export interface UseImageGenerationReturn {
  isGenerating: boolean
  error: string | null
  result: GenerationResult | null
  generateImage: (
    prompt: string,
    model?: string,
    quality?: string,
    config?: GenerationConfig
  ) => Promise<GenerationResult | undefined>
  reset: () => void
  setResult: (result: GenerationResult | null) => void
}

export function useImageGeneration(): UseImageGenerationReturn {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<GenerationResult | null>(null)

  const generateImage = useCallback(
    async (
      prompt: string,
      model = 'phoenix-pro',
      quality = 'excellent',
      config?: GenerationConfig
    ): Promise<GenerationResult | undefined> => {
      if (!prompt.trim()) {
        setError('Please enter a prompt')
        return
      }

      setIsGenerating(true)
      setError(null)

      try {
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
        const url = `${baseUrl}${API_ENDPOINTS.GENERATE}`

        let response: Response | null = null
        let attempts = 3
        let delayMs = 1000

        for (let i = 0; i < attempts; i++) {
          try {
            response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                prompt,
                model,
                quality,
                aspectRatio: config?.aspectRatio,
                seed: config?.seed,
                enhance: config?.enhance ?? true,
              }),
            })
            break
          } catch (fetchErr) {
            if (i === attempts - 1) {
              throw fetchErr
            }
            console.warn(`[Hook] Fetch attempt ${i + 1} failed. Retrying in ${delayMs}ms...`, fetchErr)
            await new Promise((resolve) => setTimeout(resolve, delayMs))
            delayMs *= 1.5
          }
        }

        if (!response) {
          throw new Error('Failed to reach the server')
        }

        if (!response.ok) {
          let errorMessage = 'Failed to generate image'
          try {
            const errorData = await response.json()
            errorMessage = errorData.error || errorMessage
          } catch (jsonErr) {
            errorMessage = `Server error: ${response.status} ${response.statusText}`
          }
          throw new Error(errorMessage)
        }

        let data
        try {
          data = await response.json()
        } catch (jsonErr) {
          throw new Error('Invalid response format received from server')
        }

        if (!data.success) {
          throw new Error(data.error || 'Generation failed')
        }

        const newResult: GenerationResult = {
          imageUrl: data.imageUrl,
          generationTime: data.generationTime,
          resolution: data.resolution,
          quality: data.quality,
          seed: data.seed,
          aspectRatio: data.aspectRatio || '1:1',
          model: data.model || model,
          prompt: data.prompt || prompt,
          timestamp: data.timestamp || Date.now(),
        }

        setResult(newResult)
        return newResult
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred'
        setError(message)
        console.error('[Hook] Generation error:', err)
      } finally {
        setIsGenerating(false)
      }
    },
    []
  )

  const reset = useCallback(() => {
    setIsGenerating(false)
    setError(null)
    setResult(null)
  }, [])

  return {
    isGenerating,
    error,
    result,
    generateImage,
    reset,
    setResult,
  }
}
