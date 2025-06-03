import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { Imoveis } from '../imoveis/imoveis';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
//import { imoveis } from '../../data/imoveis.data';
import { Imovel } from '../../interfaces/imovel.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ImovelService } from '../../services/imovel.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  imports: [Imoveis, RouterLink, AsyncPipe, CurrencyPipe],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  imoveis$: Observable<Imovel[]> | null = null;

  constructor(private imovelService: ImovelService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.imoveis$ = this.imovelService
        .getAllImoveis()
        .pipe(
          map((imoveis: Imovel[]) =>
            imoveis.filter((imovel) => imovel.urlFotoDestaque).slice(0, 5),
          ),
        );
    }
  }
}
