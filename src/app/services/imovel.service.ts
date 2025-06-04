import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, shareReplay } from 'rxjs/operators';
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
  private cache = new Map<string, any>();
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

  getImoveis(
    quantidadeImoveis: number = 999,
    tipoImovel?: TipoImovelId,
    forceRefresh = false,
  ): Observable<Imovel[]> {
    const params: ImovelSmartRequest = {
      quantidadeImoveis,
      ...(tipoImovel && { tipoImovel }),
    };
    const cacheKey = `imoveis_${tipoImovel}`;

    if (!forceRefresh && this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    const result$ = this.http
      .get<Imovel[]>(`${this.apiUrl}/imoveis`, {
        params: {
          quantidadeImoveis: quantidadeImoveis.toString() || '999',
          tipoImovel: tipoImovel?.toString() || '1;2;3;4;5;6;7;8;9;10',
        },
      })
      .pipe(
        shareReplay(1), // Cache the result
        catchError(this.handleError<Imovel[]>('getImoveis', [])),
      );

    // Cache the result
    result$.subscribe((imoveis) => {
      this.cache.set(cacheKey, imoveis);
    });

    return result$;
  }

  /*getImovelByUrlLocal(urlCustom: string): Observable<Imovel | undefined> {
    return of(imoveis.find((i) => i.urlCustom === urlCustom));
  }*/

  getImovelByUrl(urlCustom: string): Observable<Imovel | undefined> {
    const cacheKey = `imovel_${urlCustom}`;

    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    return this.getImoveis().pipe(
      map((imoveis) => {
        const imovel = imoveis.find((i) => i.urlCustom === urlCustom);
        if (imovel) {
          this.cache.set(cacheKey, imovel);
        }
        return imovel;
      }),
      catchError(
        this.handleError<Imovel | undefined>('getImovelByUrl', undefined),
      ),
    );
  }

  /*getImoveisByTipo(
    tipoSlug: string,
    forceRefresh = false,
  ): Observable<Imovel[]> {
    console.log(tipoSlug);
    const cacheKey = `imoveis_tipo_${tipoSlug}`;

    if (!forceRefresh && this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }
    // Converta tipoSlug para TipoImovelId
    const tipoImovelId = tiposImoveis.find((t) => t.slug === tipoSlug)?.id;
    console.log(tipoImovelId);
    const result$ = this.getImoveis(999, tipoImovelId).pipe(
      catchError(this.handleError<Imovel[]>('getImoveisByTipo', [])),
    );

    // Cache the result
    result$.subscribe((imoveis) => {
      this.cache.set(cacheKey, imoveis);
    });

    return result$;
  }*/

  // Clear specific cache or all cache
  clearCache(key?: string) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
      this.allImoveis$ = null;
    }
  }
}
