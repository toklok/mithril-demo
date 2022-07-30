export async function secret(request: Request): Promise<Response> {
  if (request.method === 'POST') {
    return new Response('OK')
  }
  return new Response('OK')
}
