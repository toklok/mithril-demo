import { Request, Response } from '@miniflare/core'
import { Miniflare } from 'miniflare'

declare var global: any

const mf = new Miniflare({
  modules: true,
  scriptPath: './dist/index.mjs',
})

describe('api end point', () => {
  afterAll(async () => {
    await mf.dispose()
  })

  test('handle api request to DarkSky with latitude/longitude from cf object', async () => {
    const res = await mf.dispatchFetch(
      new Request('http://localhost:8787/weather/me', {
        method: 'GET',
        cf: {
          latitude: '42.3601',
          longitude: '71.0589',
          ...global.cf,
        },
      }),
    )
    expect(res.status).toBe(200)
    expect(res).toBeDefined()
    expect(res.headers.get('content-type')).toBe(
      'application/json;charset=UTF-8',
    )
    expect(res).toBeInstanceOf(Response)
    expect(await res.json()).toEqual({})
  })

  test('handle no latitude/longitude from cf object', async () => {
    const res = await mf.dispatchFetch(
      new Request('http://localhost:8787/weather/me', {
        method: 'GET',
        cf: {
          latitude: undefined,
          longitude: undefined,
          ...global.cf,
        },
      }),
    )
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toBe(
      'application/json;charset=UTF-8',
    )
    expect(await res.json()).toEqual({ geolocate: false })
  })

  test('create customer with POST', async () => {
    const res = await mf.dispatchFetch(
      new Request('http://localhost:8787/create-customer', {
        body: JSON.stringify({
          email: 'joseph@testing.com',
          description: 'Customer 1',
        }),
        method: 'POST',
      }),
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      id: 'cust_123',
      description: 'a very nice person',
      email: 'testing@emails.com',
    })
  })

  test('create customer GET method not allowed', async () => {
    const res = await mf.dispatchFetch(
      new Request('http://localhost:8787/create-customer', { method: 'GET' }),
    )
    expect(res.status).toBe(405)
    expect(await res.text()).toBe('Method not allowed')
  })
})
