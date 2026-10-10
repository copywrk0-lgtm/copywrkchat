// Vercel Node Function: handles /api/* rewrite (see vercel.json).
import { handleApiRequest } from '../server.mjs';
export default async function handler(req, res) {
  const url = new URL(req.url || '/api/chat', 'https://local.invalid');
  const original = req.query?.route || url.searchParams.get('route') || url.pathname.replace(/^\/api\/?/, '');
  await handleApiRequest(req, res, '/api/' + String(original).replace(/^\//, ''));
}
