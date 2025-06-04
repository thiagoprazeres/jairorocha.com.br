import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Imoveis } from '../imoveis/imoveis';
import { Observable } from 'rxjs';
//import { imoveis } from '../../data/imoveis.data';
import { Imovel } from '../../interfaces/imovel.interface';
import { CurrencyPipe } from '@angular/common';
import { ImovelService } from '../../services/imovel.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  imports: [Imoveis, AsyncPipe, CurrencyPipe],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  imoveis$: Observable<Imovel[]> | null = null;

  constructor(private imovelService: ImovelService) {}

  ngOnInit(): void {
    this.imoveis$ = this.imovelService
      .getAllImoveis()
      .pipe(
        map((imoveis: Imovel[]) =>
          imoveis.filter((imovel) => imovel.urlFotoDestaque).slice(0, 5),
        ),
      );
  }
}
