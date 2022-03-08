import faunadb from 'faunadb'
// @ts-ignore
import { customFetch } from 'utils/customFetch'

const FAUNA_SECRET = process.env.FAUNA_SECRET!

const faunaClient = new faunadb.Client({
  secret: FAUNA_SECRET,
  domain: 'db.us.fauna.com',
  // @ts-ignore
  fetch: customFetch,
})

export default faunaClient
export const { query } = faunadb
