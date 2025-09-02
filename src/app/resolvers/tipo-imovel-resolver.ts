import { ResolveFn } from '@angular/router';
import { Imovel } from '../interfaces/imovel.interface';
import { inject } from '@angular/core';
import { ImovelService } from '../services/imovel.service';
import { tiposImoveis } from '../data/enum.data';
import { TipoImovel } from '../interfaces/tipo-imovel';
// import { CategoriaImovelId, TipoImovelId } from '../enums/imovel.enum';
import { TipoImovelId } from '../enums/imovel.enum';
// import { categoriasImoveis } from '../data/enum.data';

export const tipoImovelResolver: ResolveFn<Imovel[]> = (route, state) => {
  const imovelService = inject(ImovelService);
  // const categoriaSlug = route.params['categoriaSlug'];
  const tipoSlug = route.params['tipoSlug'];
  // const categoriaImovelId: CategoriaImovelId | undefined = categoriasImoveis.find((c: CategoriaImovel) => c.slug === categoriaSlug)?.id;
  const tipoImovelId: TipoImovelId | undefined = tiposImoveis.find((t: TipoImovel) => t.slug === tipoSlug)?.id;
  return imovelService.findByTipoImovel(tipoImovelId);
};
