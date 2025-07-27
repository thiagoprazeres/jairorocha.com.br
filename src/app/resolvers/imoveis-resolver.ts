import { ResolveFn } from '@angular/router';
import { Imovel } from '../interfaces/imovel.interface';
import { inject } from '@angular/core';
import { ImovelService } from '../services/imovel.service';

export const imoveisResolver: ResolveFn<Imovel[]> = (route, state) => {
  const imovelService = inject(ImovelService);
  return imovelService.findByDestaqueNoBanner(true);
};
