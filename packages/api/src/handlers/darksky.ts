const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY

export async function weatherNearMe(request: Request): Promise<Response> {
  if (
    request.cf?.latitude !== undefined ||
    request.cf?.longitude !== undefined
  ) {
    const lat = request.cf?.latitude
    const lng = request.cf?.longitude

    const url = new URL(
      `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${lat},${lng}`,
    ).href

    const result = await fetch(url).then((response) => {
      if (response.ok) {
        return response.json()
      }
    })

    return new Response(JSON.stringify(result), {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })
  }
  return new Response(JSON.stringify({ Error: true }), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}
