import { weatherNearMe } from '../src/handlers/darksky'
import { createCustomer } from '../src/handlers/subscriptions/create'
// import faunadb from 'faunadb'

// const FAUNA_SECRET = process.env.FAUNA_SECRET!

// const faunaClient = new faunadb.Client({
//   secret: FAUNA_SECRET,
// })

export default {
  async fetch(request: Request) {
    try {
      const url = new URL(request.url)
      switch (url.pathname) {
        case '/weather/me':
          return weatherNearMe(request)
        case '/create-customer':
          return createCustomer(request)
        default:
          return weatherNearMe(request)
      }
    } catch (err) {
      return new Response('Error :(')
    }
  },
}
