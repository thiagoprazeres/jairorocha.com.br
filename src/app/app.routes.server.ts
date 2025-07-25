import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { categoriasImoveis, tiposImoveis } from './data/enum.data';
import { ids } from './data/ids';

// Function to get all possible paths for prerendering
export async function getPrerenderParams() {
  // For now, we'll only prerender static routes
  // For dynamic routes, you should implement logic to fetch all possible slugs
  // and return them here as an array of parameter objects
  return Promise.resolve([
    { path: '/' },
    { path: '/sobre-nos' },
    { path: '/imoveis' },
    { path: '/imovel' },
    { path: '/contato' },
    // Add more static routes as needed
  ]);
}

export const serverRoutes: ServerRoute[] = [
  // Static routes with prerendering
  {
    path: '',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client,
    getPrerenderParams,
  },
  {
    path: 'sobre-nos',
    renderMode: RenderMode.Prerender,
    getPrerenderParams,
  },
  {
    path: 'imoveis',
    renderMode: RenderMode.Prerender,
    getPrerenderParams,
  },
  {
    path: 'contato',
    renderMode: RenderMode.Prerender,
    getPrerenderParams,
  },
  // Dynamic routes - set to client-side rendering
  {
    path: 'imoveis/:categoriaSlug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return categoriasImoveis.map((categoria) => ({
        categoriaSlug: categoria.slug,
      }));
    },
  },
  {
    path: 'imoveis/:categoriaSlug/:tipoSlug',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client,
    async getPrerenderParams() {
      return tiposImoveis.map((tipo) => ({
        categoriaSlug: tipo.categoriaImovel.slug,
        tipoSlug: tipo.slug,
      }));
    },
  },
  {
    path: 'imoveis/:categoriaSlug/:tipoSlug/:urlCustom/:id',
    fallback: PrerenderFallback.Client,
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return ids.map((id) => ({
        categoriaSlug: id.split('/')[0],
        tipoSlug: id.split('/')[1],
        urlCustom: id.split('/')[2],
        id: id.split('/')[3],
      }));
    },
  },
];
