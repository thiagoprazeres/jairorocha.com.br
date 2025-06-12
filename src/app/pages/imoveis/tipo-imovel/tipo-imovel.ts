import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TipoImovel as TipoImovelInterface } from '../../../interfaces/tipo-imovel';
import { CategoriaImovel as CategoriaImovelInterface } from '../../../interfaces/categoria-imovel';
import { Imovel } from '../../../interfaces/imovel.interface';
import { tiposImoveis } from '../../../data/enum.data';
import { ImovelService } from '../../../services/imovel.service';
import { map, Observable } from 'rxjs';
// import { imoveis } from '../../../data/imoveis.data';

@Component({
  selector: 'app-tipo-imovel',
  imports: [CommonModule],
  templateUrl: './tipo-imovel.html',
  standalone: true,
})
export class TipoImovel implements OnInit {
  categoria: CategoriaImovelInterface | undefined;
  tipo: TipoImovelInterface | undefined;
  outrosTipos: TipoImovelInterface[] = [];
  imoveis: Imovel[] | undefined;
  filtroNovo: boolean | null = null;
  filtroVendaOuAluguel: 'todos' | 'venda' | 'aluguel' | null = null;
  filtroRegiao: string | null = null;
  regioesDisponiveis: string[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private imovelService: ImovelService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: { [key: string]: string }) => {
      const tipoSlug = params['tipoSlug'];

      // Reset state
      this.isLoading = true;
      this.error = null;
      // Find the current property type
      this.tipo = tiposImoveis.find(
        (t: TipoImovelInterface) => t.slug === tipoSlug,
      );

      if (this.tipo) {
        this.categoria = this.tipo.categoriaImovel;

        // Get other property types in the same category
        this.outrosTipos = tiposImoveis.filter(
          (t: TipoImovelInterface) =>
            t.categoriaImovel.id === this.categoria?.id &&
            t.id !== this.tipo?.id,
        );

        this.isLoading = false;
        this.error = null;
      } else {
        this.handleError('Tipo de imóvel não encontrado');
      }
    });

    this.route.data.subscribe((data: any) => {
      this.imoveis = data['imoveis'];
    });
  }

  // Propriedade computada para obter o texto do botão de região
  get textoFiltroRegiao(): string {
    if (!this.filtroRegiao) return 'Todas as cidades';
    return this.filtroRegiao; // Retorna apenas o nome da cidade
  }

  // Filtra os imóveis com base nos filtros ativos
  get imoveisFiltrados(): Imovel[] | undefined {
    return this.imoveis?.filter(
      (imovel: Imovel) =>
        this.passouFiltroNovo(imovel) &&
        this.passouFiltroVendaAluguel(imovel) &&
        this.passouFiltroRegiao(imovel),
    );
  }

  // Verifica se o imóvel passa no filtro de novo/usado
  passouFiltroNovo(imovel: Imovel): boolean {
    return this.filtroNovo === null || imovel.novos === this.filtroNovo;
  }

  // Verifica se o imóvel passa no filtro de venda/aluguel
  passouFiltroVendaAluguel(imovel: Imovel): boolean {
    if (this.filtroVendaOuAluguel === 'todos') return true;
    if (this.filtroVendaOuAluguel === 'venda') return imovel.paraVenda === true;
    if (this.filtroVendaOuAluguel === 'aluguel')
      return imovel.paraLocacao === true;
    return true;
  }

  // Verifica se o imóvel passa no filtro de região
  passouFiltroRegiao(imovel: Imovel): boolean {
    if (!this.filtroRegiao) return true;
    return imovel.nomeCidade.toLowerCase() === this.filtroRegiao.toLowerCase();
  }

  // Atualiza a lista de cidades disponíveis com base nos imóveis
  private atualizarRegioesDisponiveis(imoveis: Imovel[]): void {
    const cidades = new Set<string>();

    imoveis.forEach((imovel) => {
      if (imovel.nomeCidade) {
        cidades.add(imovel.nomeCidade);
      }
    });

    this.regioesDisponiveis = Array.from(cidades).sort((a, b) =>
      a.localeCompare(b),
    );
  }

  // Define o filtro de região
  setFiltroRegiao(regiao: string | null): void {
    this.filtroRegiao = regiao;
  }

  setFiltroNovo(valor: boolean | null) {
    console.log(valor);
    if (valor === true && this.filtroVendaOuAluguel === 'aluguel') {
      this.setFiltroVendaOuAluguel('todos');
    }
    this.filtroNovo = valor;
  }

  setFiltroVendaOuAluguel(valor: 'todos' | 'venda' | 'aluguel') {
    if (valor === 'aluguel' && this.filtroNovo === true) {
      this.setFiltroNovo(null);
    }
    this.filtroVendaOuAluguel = valor;
  }

  private handleError(message: string) {
    this.error = message;
    this.isLoading = false;
    this.imoveis = [];
    // this.imoveisFiltrados = [];
  }
}
