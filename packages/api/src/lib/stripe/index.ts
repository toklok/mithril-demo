const STRIPE_API_KEY = process.env.STRIPE_API_KEY!

import Stripe from 'stripe'

export const stripe = new Stripe(STRIPE_API_KEY, {
  //@ts-ignore
  apiVersion: null,
  httpClient: Stripe.createFetchHttpClient(),
})
