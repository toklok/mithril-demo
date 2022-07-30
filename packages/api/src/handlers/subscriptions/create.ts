import Stripe from 'stripe'

import { IStripeUsers } from 'types/main.interface'

const STRIPE_API_KEY = process.env.STRIPE_API_KEY!

export const stripe = new Stripe(STRIPE_API_KEY, {
  httpClient: Stripe.createFetchHttpClient(),
  apiVersion: '2020-08-27',
})

/**
 * Create customer in Stripe
 */
export async function createCustomer(request: Request): Promise<Response> {
  if (MINIFLARE && request.method === 'POST') {
    return new Response(
      JSON.stringify({
        id: 'cust_123',
        email: 'testing@emails.com',
        description: 'a very nice person',
      }),
    )
  }

  if (request.method === 'POST') {
    const { email, description } = await request.json<IStripeUsers>()
    try {
      const customer = await stripe.customers.create({
        email: email,
        description: description,
      })
      return new Response(JSON.stringify(customer))
    } catch (error: unknown) {
      const status = error?.raw?.statusCode ?? 500
      const message = String(error)
      return new Response(message, { status: status })
    }
  } else {
    return new Response('Method not allowed', { status: 405 })
  }
}
