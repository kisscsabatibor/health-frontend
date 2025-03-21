import { inject, Injectable } from '@angular/core'
import { AuthService } from '../auth/auth.service'
import { LoginPayload, RegistrationPayload } from '../auth/auth.payload'
import { tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private authService = inject(AuthService)
  public isLoggedIn = !!localStorage.getItem('token')

  public registerUser(registrationPayload: RegistrationPayload) {
    return this.authService.registerUser(registrationPayload)
  }
  public loginUser(loginPayload: LoginPayload) {
    return this.authService
      .loginUser(loginPayload)
      .pipe(tap(() => (this.isLoggedIn = true)))
  }

  public getProfile() {
    return this.authService.getProfile()
  }

  public logOut() {
    this.isLoggedIn = false
    this.authService.logOut()
  }
}
