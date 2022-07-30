import faunaClient, { query } from 'lib/faunadb'
import { getFaunaError } from 'utils'
import { IUsers, IFaunaUser } from 'types/main.interface'

const { Login, Match, Index } = query

/**
 * Log in User
 */
export async function loginUser(request: Request): Promise<Response> {
  const { email, password } = await request.json<IUsers>()

  if (MINIFLARE) {
    return new Response(
      JSON.stringify({
        email: email,
        password: password,
      }),
      { status: 200 },
    )
  }

  if (request.method === 'POST') {
    try {
      if (!email || !password) {
        throw new Error('Email and password must be provided.')
      }

      const login: IFaunaUser = await faunaClient.query(
        Login(Match(Index('users_by_email'), email), {
          password,
        }),
      )
      if (!login.secret) {
        throw new Error('No secret present in login query response.')
      } else {
        return new Response(JSON.stringify(login.secret))
      }
    } catch (e: unknown) {
      const faunaError = getFaunaError(e)
      return new Response(faunaError.description, {
        status: faunaError.status,
      })
    }
  }
  return new Response(null, { status: 400 })
}
