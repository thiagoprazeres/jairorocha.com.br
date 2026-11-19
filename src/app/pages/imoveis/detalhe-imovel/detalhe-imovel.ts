import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  PLATFORM_ID,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LgGalleryComponent, type LgGalleryItem } from '@lightgallery/angular';
import { withThumbnail } from '@lightgallery/angular/plugins/thumbnail';
import { withZoom } from '@lightgallery/angular/plugins/zoom';
import { Imovel } from '../../../interfaces/imovel.interface';
import { register } from 'swiper/element/bundle';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { situacoesEmpreendimentos, estagiosObra } from '../../../data/enum.data';
import { SituacaoEmpreendimento } from '../../../interfaces/situacao-empreendimento';
import { EstagioObra } from '../../../interfaces/estagio-obra';

@Component({
  selector: 'app-detalhe-imovel',
  standalone: true,
  imports: [CommonModule, LgGalleryComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './detalhe-imovel.html',
})
export class DetalheImovelComponent implements OnInit {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  protected readonly galleryFeatures = [withZoom(), withThumbnail()];
  protected gallerySlides: LgGalleryItem[] = [];
  spaceBetween = 10;
  imovel!: Imovel;
  iframeUrl: SafeResourceUrl;
  situacoesEmpreendimentos: SituacaoEmpreendimento[] = situacoesEmpreendimentos;
  situacoesEmpreendimentoNome!: SituacaoEmpreendimento | null;
  estagiosObra: EstagioObra[] = estagiosObra;
  estagioObraNome!: EstagioObra | null;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {
    this.iframeUrl = '';
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      register();
    }

    this.route.data.subscribe((data: any) => {
      // console.log(data['imovel']);
      this.imovel = data['imovel'];
      this.gallerySlides = (this.imovel.fotoImovelList ?? []).map((foto, index) => {
        const caption = `${this.imovel.nomeImovel} - Foto ${index + 1}`;
        return { src: foto.url, thumb: foto.url, alt: caption, caption };
      });
      this.situacoesEmpreendimentoNome = this.situacoesEmpreendimentos.find(
        (situacaoEmpreendimento) =>
          situacaoEmpreendimento.id === this.imovel.situacaoEmpreendimento || null,
      )!;
      this.estagioObraNome = this.estagiosObra.find(
        (estagioObra) =>
          estagioObra.id === this.imovel.estagioObra || null,
      )!;
      // Replace string to https://www.youtube.com/watch?v=wXm6h1KcevA for https://www.youtube.com/embed/wXm6h1Kcev A
      this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.imovel.tourVirtual?.replace('watch?v=', 'embed/')!,
      );
    });
  }

}
