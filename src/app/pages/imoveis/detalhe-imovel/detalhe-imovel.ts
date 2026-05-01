import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Imovel } from '../../../interfaces/imovel.interface';
import { ImovelService } from '../../../services/imovel.service';
import { register } from 'swiper/element/bundle';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { situacoesEmpreendimentos, estagiosObra } from '../../../data/enum.data';
import { SituacaoEmpreendimento } from '../../../interfaces/situacao-empreendimento';
import { EstagioObra } from '../../../interfaces/estagio-obra';
import { LightgalleryModule } from 'lightgallery/angular';
import { LightGallery } from 'lightgallery/lightgallery';
import { InitDetail } from 'lightgallery/lg-events';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';

@Component({
  selector: 'app-detalhe-imovel',
  standalone: true,
  imports: [CommonModule, LightgalleryModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './detalhe-imovel.html',
})
export class DetalheImovelComponent implements OnInit {
  private lgInstance?: LightGallery;
  private platformId = inject(PLATFORM_ID);
  protected isBrowser = isPlatformBrowser(this.platformId);
  spaceBetween = 10;
  imovel!: Imovel;
  iframeUrl: SafeResourceUrl;
  situacoesEmpreendimentos: SituacaoEmpreendimento[] = situacoesEmpreendimentos;
  situacoesEmpreendimentoNome!: SituacaoEmpreendimento | null;
  estagiosObra: EstagioObra[] = estagiosObra;
  estagioObraNome!: EstagioObra | null;

  settings = {
    plugins: [lgZoom, lgThumbnail],
    counter: true,
    download: false,
    selector: 'a',
  };

  private imovelService = inject(ImovelService);

  openGallery(): void {
    if (this.isBrowser) {
      this.lgInstance?.openGallery();
    }
  }

  onInitGallery = (detail: InitDetail): void => {
    this.lgInstance = detail.instance;
  };

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
