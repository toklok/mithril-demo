import { Login } from 'faunadb'
import faunaClient, { query } from 'lib/faunadb'
import { getFaunaError } from 'utils'
import { IUsers, IFaunaUser } from 'types/main.interface'

const { Create, Collection } = query

interface Login {
  secret: string
  email: string
}

/**
 * Create user in FaunaDB
 */
export async function createUser(request: Request): Promise<Response> {
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

  let user: IFaunaUser

  try {
    user = await faunaClient.query(
      Create(Collection('users'), {
        credentials: { password: password },
        data: {
          email: email,
        },
      }),
    )

    if (!user.ref) {
      throw new Error('No ref present in create query response.')
    }

    const login: Login = await faunaClient.query(
      Login(user.ref, {
        password,
      }),
    )

    if (!login.secret) {
      throw new Error('No secret present in login query response.')
    } else {
      return new Response(JSON.stringify(login.secret))
    }
  } catch (error: unknown) {
    const faunaError = getFaunaError(error)
    return new Response(faunaError.description, {
      status: faunaError.status,
    })
  }
}
