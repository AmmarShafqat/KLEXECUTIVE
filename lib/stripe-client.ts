import { loadStripe, type Stripe } from '@stripe/stripe-js'

// Singleton — Stripe.js should only be loaded once per page.
let stripePromise: Promise<Stripe | null> | null = null

export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    if (!key) {
      console.error(
        'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set. Stripe Elements will not initialize.',
      )
      return Promise.resolve(null)
    }
    stripePromise = loadStripe(key)
  }
  return stripePromise
}
