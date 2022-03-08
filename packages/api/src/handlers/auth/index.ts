import faunaClient, { query } from 'lib/faunadb'
import { getFaunaError } from 'utils/customFetch'

const { Create, Collection } = query

export async function createUser(request: Request): Promise<Response> {
  const { email, password } = await request.json()
  if (globalThis.MINIFLARE) {
    return new Response(
      JSON.stringify({
        email: email,
        password: password,
      }),
      { status: 200 },
    )
  }
  try {
    const result = await faunaClient.query(
      Create(Collection('users'), {
        credentials: { password: password },
        data: {
          email: email,
        },
      }),
    )
    return new Response(JSON.stringify(result))
  } catch (error: unknown) {
    const faunaError = getFaunaError(error)
    return new Response(faunaError.description, { status: faunaError.status })
  }
}
