import { getPayload } from 'payload'
import config from '@/payload.config'

/**
 * Get the Payload CMS client instance
 *
 * Uses caching to avoid re-initialization on every request.
 * In development, we cache on globalThis to survive HMR.
 * In production, the module-level cache is sufficient.
 */

// Type for the cached payload instance
type PayloadInstance = Awaited<ReturnType<typeof getPayload>>

// Cache the promise to avoid race conditions
let cached: Promise<PayloadInstance> | null = null

// In development, use globalThis to survive HMR
const globalForPayload = globalThis as typeof globalThis & {
  payloadPromise?: Promise<PayloadInstance>
}

export async function getPayloadClient(): Promise<PayloadInstance> {
  // Check for cached instance
  if (process.env.NODE_ENV === 'development') {
    if (globalForPayload.payloadPromise) {
      return globalForPayload.payloadPromise
    }
  } else {
    if (cached) {
      return cached
    }
  }

  // Create new instance
  const payloadPromise = getPayload({ config })

  // Cache it
  if (process.env.NODE_ENV === 'development') {
    globalForPayload.payloadPromise = payloadPromise
  } else {
    cached = payloadPromise
  }

  return payloadPromise
}
