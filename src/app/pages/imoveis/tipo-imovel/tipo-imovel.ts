import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TipoImovel as TipoImovelInterface } from '../../../interfaces/tipo-imovel';
import { CategoriaImovel as CategoriaImovelInterface } from '../../../interfaces/categoria-imovel';
import { Imovel } from '../../../interfaces/imovel.interface';
import { tiposImoveis } from '../../../data/enum.data';

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
  filtroVendaOuAluguel: 'venda' | 'aluguel' | null = null;
  filtroRegiao: string | null = null;
  filtroQuartos: string | null = null;
  regioesDisponiveis: string[] = [];
  quartosDisponiveis: string[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private route: ActivatedRoute) {}

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
      this.atualizarRegioesDisponiveis(this.imoveis || []);
      this.atualizarQuartosDisponiveis(this.imoveis || []);
    });
  }

  // Propriedade computada para obter o texto do botão de região
  get textoFiltroRegiao(): string {
    if (!this.filtroRegiao) return 'Todas as cidades';
    return this.filtroRegiao; // Retorna apenas o nome da cidade
  }

  get textoFiltroQuartos(): string {
    if (!this.filtroQuartos) return 'Nº de quartos';
    return this.filtroQuartos;
  }

  // Filtra os imóveis com base nos filtros ativos
  get imoveisFiltrados(): Imovel[] | undefined {
    return this.imoveis?.filter(
      (imovel: Imovel) =>
        this.passouFiltroNovo(imovel) &&
        this.passouFiltroVendaAluguel(imovel) &&
        this.passouFiltroRegiao(imovel) &&
        this.passouFiltroQuartos(imovel),
    );
  }

  // Verifica se o imóvel passa no filtro de novo/usado
  passouFiltroNovo(imovel: Imovel): boolean {
    return this.filtroNovo === null || imovel.novos === this.filtroNovo;
  }

  // Verifica se o imóvel passa no filtro de venda/aluguel
  passouFiltroVendaAluguel(imovel: Imovel): boolean {
    if (!this.filtroVendaOuAluguel) return true;
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

  // Verifica se o imóvel passa no filtro de região
  passouFiltroQuartos(imovel: Imovel): boolean {
    if (!this.filtroQuartos) return true;
    return imovel.nquartos === this.filtroQuartos;
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

  // Atualiza a lista de cidades disponíveis com base nos imóveis
  private atualizarQuartosDisponiveis(imoveis: Imovel[]): void {
    const quartos = new Set<string>();

    imoveis.forEach((imovel) => {
      if (imovel.nquartos) {
        quartos.add(imovel.nquartos);
      }
    });

    this.quartosDisponiveis = Array.from(quartos).sort(
      (a, b) => Number(a) - Number(b),
    );
  }

  // Define o filtro de região
  setFiltroRegiao(regiao: string | null): void {
    this.filtroRegiao = regiao;
  }

  setFiltroQuartos(quarto: string | null): void {
    console.log(quarto);
    this.filtroQuartos = quarto;
  }

  setFiltroNovo(valor: boolean | null) {
    console.log(valor);
    if (valor === true && this.filtroVendaOuAluguel === 'aluguel') {
      this.setFiltroVendaOuAluguel(null);
    }
    this.filtroNovo = valor;
  }

  setFiltroVendaOuAluguel(valor: null | 'venda' | 'aluguel') {
    if (valor === 'aluguel' && this.filtroNovo === true) {
      this.setFiltroNovo(null);
    }
    this.filtroVendaOuAluguel = valor;
  }

  fecharDropdown(event: MouseEvent | PointerEvent): void {
    document.getElementById("filtroRegiaoList")?.blur();
    document.getElementById("filtroQuartosList")?.blur();
  }

  private handleError(message: string) {
    this.error = message;
    this.isLoading = false;
    this.imoveis = [];
    // this.imoveisFiltrados = [];
  }
}
