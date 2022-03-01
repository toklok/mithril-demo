const STRIPE_API_KEY = process.env.STRIPE_API_KEY!

import Stripe from 'stripe'

export const stripe = new Stripe(STRIPE_API_KEY, {
  httpClient: Stripe.createFetchHttpClient(),
  apiVersion: '2020-08-27',
})

export async function createCustomer(
  request: Request,
): Promise<Response | undefined> {
  if (request.method === 'POST') {
    try {
      const customer = await stripe.customers.create({
        description: 'Customer',
      })
      return new Response(JSON.stringify(customer))
    } catch (e) {
      return new Response('Error creating customer', { status: 500 })
    }
  } else {
    return new Response('Method not allowed', { status: 405 })
  }
}
