import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SobreNos } from './pages/sobre-nos/sobre-nos';
import { Imoveis } from './pages/imoveis/imoveis';
import { CategoriaImovel } from './pages/imoveis/categoria-imovel/categoria-imovel';
import { Contato } from './pages/contato/contato';
import { TipoImovel } from './pages/imoveis/tipo-imovel/tipo-imovel';
import { DetalheImovelComponent } from './pages/imoveis/detalhe-imovel/detalhe-imovel';
import { imoveisResolver } from './resolvers/imoveis-resolver';
import { imovelResolver } from './resolvers/imovel-resolver';
import { tipoImovelResolver } from './resolvers/tipo-imovel-resolver';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    resolve: {
      imoveis: imoveisResolver,
    },
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
    resolve: {
      imoveis: tipoImovelResolver,
    },
  },
  {
    path: 'imoveis/:categoriaSlug/:tipoSlug/:urlCustom/:id',
    component: DetalheImovelComponent,
    resolve: {
      imovel: imovelResolver,
    },
  },
  {
    path: 'contato',
    component: Contato,
  },
];
