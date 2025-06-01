import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  imovel$: Observable<Imovel | undefined> | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private imovelService: ImovelService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: { [key: string]: string }) => {
      const codigoReferenciaImovel = params['codigoReferenciaImovel'];

      this.imovel$ = this.imovelService.getImovelByCodigoReferenciaImovel(
        codigoReferenciaImovel,
      );
    });
  }
}
