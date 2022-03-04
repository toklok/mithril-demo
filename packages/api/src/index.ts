import { weatherNearMe } from './handlers/weather/darksky'
import { createCustomer } from './handlers/subscriptions/create'
// import faunadb from 'faunadb'

// const FAUNA_SECRET = process.env.FAUNA_SECRET!

// const faunaClient = new faunadb.Client({
//   secret: FAUNA_SECRET,
// })

export default {
  async fetch(request: Request): Promise<Response> {
    try {
      const url = new URL(request.url)
      switch (url.pathname) {
        case '/weather/me':
          return weatherNearMe(request)
        case '/create-customer':
          return createCustomer(request)
        default:
          return new Response('Not found', { status: 404 })
      }
    } catch (err) {
      return new Response('Error', { status: 500 })
    }
  },
}
