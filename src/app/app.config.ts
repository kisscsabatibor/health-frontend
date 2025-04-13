import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http'
import { authInterceptor } from '../interceptors/auth.interceptor'
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { registerLocaleData } from '@angular/common'
import localeDe from '@angular/common/locales/de'
import localeHu from '@angular/common/locales/hu'

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient,
) => new TranslateHttpLoader(http, './i18n/', '.json')

registerLocaleData(localeDe)
registerLocaleData(localeHu)

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideTranslateService({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
}
