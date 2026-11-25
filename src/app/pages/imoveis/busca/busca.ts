import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, of, startWith, switchMap } from 'rxjs';
import { ImovelService } from '../../../services/imovel.service';

function normalizar(texto: string): string {
  return texto.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
}

function numero(valor: string | null, minimo: number): number | null {
  if (valor === null || !valor.trim()) return null;
  const n = Number(valor);
  return Number.isFinite(n) && n >= minimo ? n : null;
}

@Component({
  selector: 'app-busca',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './busca.html',
})
export class Busca {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly imoveis = inject(ImovelService);
  private readonly consulta = toSignal(this.route.queryParamMap, { requireSync: true });
  private readonly atualizar = signal(0);

  protected readonly filtros = computed(() => {
    const params = this.consulta();
    const negocio = params.get('negocio');
    return {
      q: params.get('q')?.trim() ?? '',
      negocio: negocio === 'venda' || negocio === 'aluguel' ? negocio : '',
      tipo: params.get('tipo') ?? '',
      minimo: numero(params.get('minimo'), 0),
      maximo: numero(params.get('maximo'), 0),
      quartos: numero(params.get('quartos'), 1),
    };
  });

  protected readonly catalogo = toSignal(
    toObservable(this.atualizar).pipe(
      switchMap(() => this.imoveis.getAllImoveis().pipe(
        startWith(undefined),
        catchError(() => of(null)),
      )),
    ),
  );

  protected readonly tipos = computed(() => {
    const tipos = new Map((this.catalogo() ?? []).map(i => [i.tipoImovel.id, i.tipoImovel]));
    return [...tipos.values()].filter(tipo => tipo.nome).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  });

  protected readonly resultados = computed(() => {
    const filtros = this.filtros();
    const palavras = normalizar(filtros.q).split(/\s+/).filter(Boolean);
    return (this.catalogo() ?? []).filter(i => {
      const texto = normalizar([i.nomeImovel, i.nomeBairro, i.nomeCidade,
        i.codigoReferenciaImovel, i.tipoImovel.nome].join(' '));
      if (!palavras.every(palavra => texto.includes(palavra))) return false;
      if (filtros.tipo && String(i.tipoImovel.id) !== filtros.tipo) return false;
      if (filtros.quartos !== null && !(Number(i.nquartos) >= filtros.quartos)) return false;

      const venda = i.paraVenda && filtros.negocio !== 'aluguel';
      const aluguel = i.paraLocacao && filtros.negocio !== 'venda';
      if (filtros.negocio && !venda && !aluguel) return false;
      if (filtros.minimo === null && filtros.maximo === null) return true;

      return [venda ? Number(i.preco) : 0, aluguel ? Number(i.precoLocacao) : 0]
        .some(preco => preco > 0 && preco >= (filtros.minimo ?? 0)
          && preco <= (filtros.maximo ?? Infinity));
    });
  });

  protected readonly totalPaginas = computed(() => Math.max(1, Math.ceil(this.resultados().length / 24)));
  protected readonly pagina = computed(() => Math.min(
    Math.floor(numero(this.consulta().get('pagina'), 1) ?? 1), this.totalPaginas(),
  ));
  protected readonly visiveis = computed(() =>
    this.resultados().slice((this.pagina() - 1) * 24, this.pagina() * 24),
  );

  protected buscar(event: Event, form: HTMLFormElement): void {
    event.preventDefault();
    const dados = new FormData(form);
    const minimo = numero(String(dados.get('minimo') ?? ''), 0);
    const maximo = numero(String(dados.get('maximo') ?? ''), 0);
    const campoMaximo = form.elements.namedItem('maximo') as HTMLInputElement;
    campoMaximo.setCustomValidity(minimo !== null && maximo !== null && minimo > maximo
      ? 'O preço máximo deve ser maior ou igual ao mínimo.' : '');
    if (!form.reportValidity()) return;

    const queryParams = Object.fromEntries(
      Array.from(dados, ([chave, valor]) => [chave, String(valor).trim() || null]),
    );
    void this.router.navigate(['/imoveis/busca'], { queryParams });
  }

  protected tentarNovamente(): void {
    this.atualizar.update(valor => valor + 1);
  }
}
