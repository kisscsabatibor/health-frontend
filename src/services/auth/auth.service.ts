import { inject, Injectable } from '@angular/core'
import {
  BACKEND_URL,
  LoginPayload,
  LoginResponsePayload,
  RegistrationPayload,
} from './auth.payload'
import { HttpClient } from '@angular/common/http'
import { catchError, of, tap } from 'rxjs'
import { User } from '../user/user'

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
        tap((response) => {
          localStorage.setItem('token', response.token as string)
          localStorage.setItem('role', response.role as string)
        }),
        catchError((err) => of(err)),
      )
  }

  public getProfile() {
    return this.http.get<User>(BACKEND_URL + '/api/user/profile')
  }

  public getAuthToken() {
    return localStorage.getItem('token') || ''
  }

  public isDoctor() {
    return localStorage.getItem('role') === 'doctor'
  }

  public logOut() {
    localStorage.removeItem('role')
    localStorage.removeItem('token')
  }
}
