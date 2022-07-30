const allowedOrigins = ['http://127.0.0.1:8080']

export const corsHeaders = (origin: string): Headers | HeadersInit => ({
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Origin': origin,
})

export const checkOrigin = (request: Request): string => {
  const origin = request.headers.get('Origin') || ''
  return (
    allowedOrigins.find((allowedOrigin) => allowedOrigin.includes(origin)) || ''
  )
}
