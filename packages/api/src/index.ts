import { weatherNearMe } from './handlers/weather/darksky'
import { createCustomer } from './handlers/subscriptions/create'
import { createUser, loginUser, logoutUser, secret } from './handlers/auth'

export default {
  async fetch(request: Request): Promise<Response> {
    try {
      const url = new URL(request.url)
      switch (url.pathname) {
        case '/weather/me':
          return weatherNearMe(request)
        case '/signup':
          return createUser(request)
        case '/signin':
          return loginUser(request)
        case '/create-customer':
          return createCustomer(request)
        case '/secret':
          return secret(request)
        default:
          return new Response('Not found', { status: 404 })
      }
    } catch (err) {
      return new Response('Error', { status: 500 })
    }
  },
}
