import { inject, Injectable } from '@angular/core'
import {
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
    return this.http.post('http://localhost:3000/register', registrationPayload)
  }

  public loginUser(loginPayload: LoginPayload) {
    return this.http
      .post<LoginResponsePayload>('http://localhost:3000/login', loginPayload)
      .pipe(
        tap((token) => localStorage.setItem('token', token.token as string)),
        catchError((err) => of(err)),
      )
  }

  public getProfile() {
    return this.http.get('http://localhost:3000/profile')
  }

  public getAuthToken() {
    return localStorage.getItem('token') || ''
  }

  public logOut() {
    localStorage.removeItem('token')
  }
}
