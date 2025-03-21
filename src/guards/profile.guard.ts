import { inject } from '@angular/core'
import { CanActivateFn } from '@angular/router'
import { UserService } from '../services/user/user.service'

export const profileGuard: CanActivateFn = (route, state) => {
  return inject(UserService).isLoggedIn
}
