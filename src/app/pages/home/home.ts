import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
// import { AsyncPipe, JsonPipe } from '@angular/common';
import { Imoveis } from '../imoveis/imoveis';
//import { Observable } from 'rxjs';
//import { imoveis } from '../../data/imoveis.data';
import { Imovel } from '../../interfaces/imovel.interface';
import { CurrencyPipe } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { ActivatedRoute } from '@angular/router';

register();
@Component({
  selector: 'app-home',
  imports: [CurrencyPipe, Imoveis],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  spaceBetween = 10;
  imoveis: Imovel[] | null = null;
  imoveisDestaqueBanner: Imovel[] | null = null;
  imoveisDestaque: Imovel[] | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      this.imoveis =
        data['imoveis'].filter(
          (imovel: Imovel) => imovel.urlFotoDestaque !== '',
        ) || null;
      this.imoveisDestaqueBanner =
        data['imoveis'].filter(
          (imovel: Imovel) => imovel.destaquebanner === '1',
        ) || null;
      this.imoveisDestaque =
        data['imoveis'].filter(
          (imovel: Imovel) =>
            imovel.destaque === '1' || imovel.destaquebanner === '0',
        ) || null;
    });
  }
}
