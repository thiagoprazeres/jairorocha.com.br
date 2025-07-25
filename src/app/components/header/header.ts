import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriaImovel } from '../../interfaces/categoria-imovel';
import { TipoImovel } from '../../interfaces/tipo-imovel';
import { categoriasImoveis, tiposImoveis } from '../../data/enum.data';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  categorias: CategoriaImovel[] = [];
  tiposPorCategoria: { [key: number]: TipoImovel[] } = {};

  constructor() {
    this.categorias = categoriasImoveis;
    this.organizarTiposPorCategoria();
  }

  private organizarTiposPorCategoria(): void {
    this.tiposPorCategoria = {};
    
    this.categorias.forEach(categoria => {
      this.tiposPorCategoria[categoria.id] = tiposImoveis.filter(
        tipo => tipo.categoriaImovel.id === categoria.id
      );
    });
  }

  getTiposByCategoria(categoriaId: number): TipoImovel[] {
    return this.tiposPorCategoria[categoriaId] || [];
  }
}
