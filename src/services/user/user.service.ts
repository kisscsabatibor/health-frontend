import { inject, Injectable } from '@angular/core'
import { AuthService } from '../auth/auth.service'
import {
  BACKEND_URL,
  LoginPayload,
  RegistrationPayload,
} from '../auth/auth.payload'
import { HttpClient } from '@angular/common/http'
import { User } from './user'
import { catchError, of } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private authService = inject(AuthService)
  private http = inject(HttpClient)
  public isLoggedIn = !!localStorage.getItem('token')

  public registerUser(registrationPayload: RegistrationPayload) {
    return this.authService.registerUser(registrationPayload)
  }
  public loginUser(loginPayload: LoginPayload) {
    return this.authService.loginUser(loginPayload)
  }

  public getProfile() {
    return this.authService.getProfile()
  }

  public updateProfile(updateProfilePayload: User) {
    return this.http
      .put(BACKEND_URL + '/api/user/profile', updateProfilePayload)
      .pipe(catchError((err) => of(err)))
  }

  public deleteAccount() {
    return this.http.delete(BACKEND_URL + '/api/user/profile')
  }

  public getDoctors() {
    return this.http.get<User[]>(BACKEND_URL + '/api/user/doctors')
  }

  public getPatients() {
    return this.http.get<User[]>(BACKEND_URL + '/api/user/patients')
  }

  public logOut() {
    this.isLoggedIn = false
    this.authService.logOut()
  }
}
