import { inject, Injectable } from '@angular/core'
import {
  BACKEND_URL,
  LoginPayload,
  LoginResponsePayload,
  RegistrationPayload,
} from './auth.payload'
import { HttpClient } from '@angular/common/http'
import { catchError, of, tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient)

  public registerUser(registrationPayload: RegistrationPayload) {
    return this.http
      .post(BACKEND_URL + '/api/auth/register', registrationPayload)
      .pipe(catchError((err) => of(err)))
  }

  public loginUser(loginPayload: LoginPayload) {
    return this.http
      .post<LoginResponsePayload>(BACKEND_URL + '/api/auth/login', loginPayload)
      .pipe(
        tap((token) => localStorage.setItem('token', token.token as string)),
        catchError((err) => of(err)),
      )
  }

  public getProfile() {
    return this.http.get(BACKEND_URL + '/api/user/profile')
  }

  public getAuthToken() {
    return localStorage.getItem('token') || ''
  }

  public logOut() {
    localStorage.removeItem('token')
  }
}
