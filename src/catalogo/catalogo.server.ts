import { readFile } from 'node:fs/promises';
import type { Imovel } from '../app/interfaces/imovel.interface';

let loading: Promise<Imovel[]> | undefined;

export function loadCatalog(): Promise<Imovel[]> {
  loading ??= readFile('.catalogo.json', 'utf8').then(data => JSON.parse(data) as Imovel[])
    .catch(error => { loading = undefined; throw error; });
  return loading;
}

export async function catalogResponse(path: string) {
  const rows = await loadCatalog();
  const parts = path.replace(/^\/api\/imoveis\/?/, '').split('/');
  const [route, value] = parts;
  if (!route) return rows;
  if (route === 'ids') return rows.map(i => [i.tipoImovel.categoriaImovel.slug, i.tipoImovel.slug, i.urlCustom, i.id].join('/'));
  if (route === 'codigos-referencia') return rows.map(i => [i.tipoImovel.categoriaImovel.slug, i.tipoImovel.slug, i.codigoReferenciaImovel].join('/'));
  if (route === 'tipoImovel') {
    const types = (value ?? '').split(';').map(Number);
    return rows.filter(i => types.includes(i.tipoImovel.id));
  }
  if (route === 'destaqueNoBanner') {
    const flag = value === 'true' ? '1' : '0';
    return rows.filter(i => String(i.destaque) === flag || String(i.destaquebanner) === flag);
  }
  if (route === 'codigoReferenciaImovel') return rows.find(i => i.codigoReferenciaImovel === value) ?? null;
  return rows.find(i => String(i.id) === route) ?? null;
}
