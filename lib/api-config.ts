// API Configuration and Constants

export const API_ENDPOINTS = {
  GENERATE: '/api/generate',
  MODELS: '/api/models',
  PRICING: '/api/pricing',
} as const

export const GENERATION_MODELS = {
  PHOENIX_PRO: {
    id: 'phoenix-pro',
    name: 'Phoenix Pro',
    description: 'Most advanced model with exceptional quality',
    qualityLevel: 'Excellent',
    speedLevel: 'Fast',
    costPerImage: 0.04,
  },
  QUANTUM_ULTRA: {
    id: 'quantum-ultra',
    name: 'Quantum Ultra',
    description: 'High-speed generation with great quality',
    qualityLevel: 'High',
    speedLevel: 'Very Fast',
    costPerImage: 0.02,
  },
  NOVA_LIGHT: {
    id: 'nova-light',
    name: 'Nova Light',
    description: 'Lightweight and fast for quick generations',
    qualityLevel: 'Good',
    speedLevel: 'Instant',
    costPerImage: 0.01,
  },
} as const

export const QUALITY_OPTIONS = {
  STANDARD: { value: 'standard', label: 'Standard', multiplier: 1 },
  EXCELLENT: { value: 'excellent', label: 'Excellent', multiplier: 1.5 },
  ULTRA: { value: 'ultra', label: 'Ultra', multiplier: 2 },
} as const

export const RESOLUTION_OPTIONS = {
  '512x512': { width: 512, height: 512, costMultiplier: 0.5 },
  '768x768': { width: 768, height: 768, costMultiplier: 1 },
  '1024x1024': { width: 1024, height: 1024, costMultiplier: 1.5 },
  '1536x1536': { width: 1536, height: 1536, costMultiplier: 2.5 },
} as const

export const GENERATION_TIMEOUTS = {
  MIN_SIMULATION_TIME: 1800, // 1.8 seconds
  MAX_SIMULATION_TIME: 3500, // 3.5 seconds
} as const

export type GenerationModel = keyof typeof GENERATION_MODELS
export type QualityOption = keyof typeof QUALITY_OPTIONS
export type ResolutionOption = keyof typeof RESOLUTION_OPTIONS
