import { RenderMode, ServerRoute } from '@angular/ssr';
import { routes } from './app.routes';
import { categoriasImoveis, tiposImoveis } from './data/enum-data';
import { codigosReferencia } from './data/codigos-referencia';
import { map } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ImovelService } from './services/imovel.service';

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
    async getPrerenderParams() {
      return tiposImoveis.map((tipo) => ({
        categoriaSlug: tipo.categoriaImovel.slug,
        tipoSlug: tipo.slug,
      }));
    },
  },
  {
    path: 'imoveis/:categoriaSlug/:tipoSlug/:codigoReferenciaImovel',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return codigosReferencia.map((codigo) => ({
        categoriaSlug: codigo.split('/')[0],
        tipoSlug: codigo.split('/')[1],
        codigoReferenciaImovel: codigo.split('/')[2],
      }));
    },
  },
];
