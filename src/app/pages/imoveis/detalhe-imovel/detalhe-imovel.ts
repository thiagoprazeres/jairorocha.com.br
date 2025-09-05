import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Imovel } from '../../../interfaces/imovel.interface';
import { ImovelService } from '../../../services/imovel.service';
import { register } from 'swiper/element/bundle';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

register();

@Component({
  selector: 'app-detalhe-imovel',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './detalhe-imovel.html',
})
export class DetalheImovelComponent implements OnInit {
  spaceBetween = 10;
  imovel!: Imovel;
  iframeUrl: SafeResourceUrl;

  private imovelService = inject(ImovelService);

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {
    this.iframeUrl = '';
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      console.log(data['imovel']);
      this.imovel = data['imovel'];
      // Replace string to https://www.youtube.com/watch?v=wXm6h1KcevA for https://www.youtube.com/embed/wXm6h1Kcev A
      this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.imovel.tourVirtual?.replace('watch?v=', 'embed/')!,
      );
    });
  }
}
