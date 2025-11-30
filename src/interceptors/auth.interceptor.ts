import { inject } from '@angular/core'
import { AuthService } from '../services/auth/auth.service'
import { HttpHandlerFn, HttpRequest } from '@angular/common/http'

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const authToken = inject(AuthService).getAuthToken()
  const lang = localStorage.getItem('lang') || 'en'

  const newReq = req.clone({
    headers: req.headers
      .append('Authorization', authToken)
      .set('Accept-Language', lang),
  })

  return next(newReq)
}
