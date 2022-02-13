import { weatherNearMe } from '../src/handlers/darksky'

export default {
  async fetch(request: Request) {
    try {
      const url = new URL(request.url)
      switch (url.pathname) {
        case '/weather/me':
          return weatherNearMe(request)
        default:
          return weatherNearMe(request)
      }
    } catch (err) {
      return new Response('Error :(')
    }
  },
}
