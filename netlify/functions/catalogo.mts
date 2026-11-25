import { catalogResponse } from '../../src/catalogo/catalogo.server';

export const config = { path: ['/api/imoveis', '/api/imoveis/*'], method: 'GET' };

export default async function catalogo(request: Request) {
  const result = await catalogResponse(new URL(request.url).pathname);
  return Response.json(result, {
    status: result === null ? 404 : 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://adm.jairorocha.com.br',
      'Netlify-CDN-Cache-Control': 'public, s-maxage=86400',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
