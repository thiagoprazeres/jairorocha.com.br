import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { AsyncPipe, CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Imovel } from '../../../interfaces/imovel.interface';
import { ImovelService } from '../../../services/imovel.service';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';
import { Observable } from 'rxjs';

register();

@Component({
  selector: 'app-detalhe-imovel',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './detalhe-imovel.html',
})
export class DetalheImovelComponent implements OnInit {
  spaceBetween = 10;

  onProgress(event: CustomEvent<[Swiper, number]>) {
    const [swiper, progress] = event.detail;
    console.log(progress);
  }

  onSlideChange() {
    console.log('slide changed');
  }
  imovel$!: Observable<Imovel>;

  private imovelService = inject(ImovelService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: { [key: string]: string }) => {
      const codigoReferenciaImovel = params['id'];

      this.imovel$ = this.imovelService.getImovelById(codigoReferenciaImovel);
    });
  }
}
