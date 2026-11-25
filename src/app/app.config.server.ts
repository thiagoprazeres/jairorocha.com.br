import { provideHttpClient, withInterceptors, HttpResponse } from '@angular/common/http';
import { from, map } from 'rxjs';
import { catalogResponse } from '../catalogo/catalogo.server';
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    provideHttpClient(withInterceptors([(req, next) => {
      const path = new URL(req.url, 'http://localhost').pathname;
      if (!path.startsWith('/api/imoveis')) return next(req);
      return from(catalogResponse(path)).pipe(map(body => new HttpResponse({ body, url: req.url })));
    }])),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
