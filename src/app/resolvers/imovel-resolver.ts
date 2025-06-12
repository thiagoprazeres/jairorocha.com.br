import { ResolveFn } from '@angular/router';
import { Imovel } from '../interfaces/imovel.interface';
import { inject } from '@angular/core';
import { ImovelService } from '../services/imovel.service';

export const imovelResolver: ResolveFn<Imovel> = (route, state) => {
  const imovelService = inject(ImovelService);
  return imovelService.getImovelById(route.params['id']);
};
