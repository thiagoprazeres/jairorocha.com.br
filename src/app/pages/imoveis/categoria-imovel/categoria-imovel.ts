import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { TipoImovel } from '../../../interfaces/tipo-imovel';
import { CategoriaImovel as CategoriaImovelInterface } from '../../../interfaces/categoria-imovel';
import { tiposImoveis, categoriasImoveis } from '../../../data/enum.data';

@Component({
  selector: 'app-categoria-imovel',
  imports: [RouterLink],
  templateUrl: './categoria-imovel.html',
})
export class CategoriaImovel implements OnInit {
  categoria: CategoriaImovelInterface | undefined;
  tiposImoveis: TipoImovel[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: { [key: string]: string }) => {
      const categoriaSlug = params['categoriaSlug'];
      this.categoria = categoriasImoveis.find(
        (cat: CategoriaImovelInterface) => cat.slug === categoriaSlug,
      );
      if (this.categoria) {
        this.tiposImoveis = tiposImoveis.filter(
          (tipo: TipoImovel) => tipo.categoriaImovel.id === this.categoria?.id,
        );
      }
    });
  }
}
