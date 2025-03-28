import { inject, Injectable } from '@angular/core'
import { AuthService } from '../auth/auth.service'
import {
  BACKEND_URL,
  LoginPayload,
  RegistrationPayload,
} from '../auth/auth.payload'
import { HttpClient } from '@angular/common/http'
import { User } from './user'

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
    return this.http.put(
      BACKEND_URL + '/api/user/profile',
      updateProfilePayload,
    )
  }

  public deleteAccount() {
    return this.http.delete(BACKEND_URL + '/api/user/profile')
  }

  public logOut() {
    this.isLoggedIn = false
    this.authService.logOut()
  }
}
