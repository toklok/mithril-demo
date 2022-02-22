import { Request, Response } from '@miniflare/core'
import { Miniflare } from 'miniflare'

const mf = new Miniflare({
  modules: true,
  scriptPath: './dist/index.mjs',
})

declare var global: any

describe('api end point', () => {
  afterAll(async () => {
    await mf.dispose()
  })

  test('handle api request to DarkSky with latitude/longitude from cf object', async () => {
    const res = await mf.dispatchFetch(
      new Request('http://localhost:8787/weather/me', {
        method: 'POST',
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
  })

  test('handle no latitude/longitude from cf object', async () => {
    const res = await mf.dispatchFetch(
      new Request('http://localhost:8787/weather/me', {
        method: 'POST',
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
    expect(await res.json()).toEqual({ Error: true })
  })
})
