import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SobreNos } from './pages/sobre-nos/sobre-nos';
import { Imoveis } from './pages/imoveis/imoveis';
import { CategoriaImovel } from './pages/imoveis/categoria-imovel/categoria-imovel';
import { Contato } from './pages/contato/contato';
import { TipoImovel } from './pages/imoveis/tipo-imovel/tipo-imovel';
import { DetalheImovelComponent } from './pages/imoveis/detalhe-imovel/detalhe-imovel';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'sobre-nos',
    component: SobreNos,
  },
  {
    path: 'imoveis',
    component: Imoveis,
  },
  {
    path: 'imoveis/:categoriaSlug',
    component: CategoriaImovel,
  },
  {
    path: 'imoveis/:categoriaSlug/:tipoSlug',
    component: TipoImovel,
  },
  {
    path: 'imoveis/:categoriaSlug/:tipoSlug/:urlCustom/:id',
    component: DetalheImovelComponent,
  },
  {
    path: 'contato',
    component: Contato,
  },
];
