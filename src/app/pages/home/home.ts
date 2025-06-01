import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Imoveis } from '../imoveis/imoveis';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
//import { imoveis } from '../../data/imoveis.data';
import { Imovel } from '../../interfaces/imovel.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ImovelService } from '../../services/imovel.service';

@Component({
  selector: 'app-home',
  imports: [Imoveis, RouterLink, AsyncPipe, CurrencyPipe],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  imoveis$: Observable<Imovel[]> | null = null;

  constructor(private imovelService: ImovelService) {}

  ngOnInit(): void {
    this.imoveis$ = this.imovelService.getImoveis(5);
  }
}
