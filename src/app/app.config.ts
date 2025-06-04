import {
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';
import { ImovelService } from './services/imovel.service';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(ptBr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideClientHydration(
      withHttpTransferCacheOptions({
        includePostRequests: true,
      }),
    ),
    provideHttpClient(withFetch()),
    ImovelService,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
};
