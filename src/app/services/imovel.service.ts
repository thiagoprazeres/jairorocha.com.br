import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { Imovel } from '../interfaces/imovel.interface'; // Import the Imovel interface
import { TipoImovelId } from '../enums/imovel.enum';
import { ImovelSmartRequest } from '../interfaces/imovel-smart-request';
// import { tiposImoveis } from '../data/enum.data';
// import { imoveis } from '../data/imoveis.data';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImovelService {
  private apiUrl = environment.apiUrl;
  private allImoveis$: Observable<Imovel[]> | null = null;
  private http = inject(HttpClient);

  constructor() {}

  /*findAllReferenceCodes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/imoveis/codigos-referencia`);
  }*/

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }

  /*getImovelByCodigoReferenciaImovel(
    codigoReferenciaImovel: string,
  ): Observable<Imovel | undefined> {
    return this.http.get<Imovel>(
      `${this.apiUrl}/imoveis/${codigoReferenciaImovel}`,
    );
  }*/

  getImovelById(id: string): Observable<Imovel> {
    return this.http.get<Imovel>(`${this.apiUrl}/imoveis/${id}`);
  }

  getAllImoveis(): Observable<Imovel[]> {
    this.allImoveis$ = this.http
      .get<Imovel[]>(`${this.apiUrl}/imoveis`, {
        params: {
          quantidadeImoveis: '999',
          tipoImovel: '1;2;3;4;5;6;7;8;9;10',
        },
      })
      .pipe(
        shareReplay(1), // Cache the result
        catchError(this.handleError<Imovel[]>('getImoveis', [])),
      );
    return this.allImoveis$;
  }
}
