import { CanActivateFn, Router } from '@angular/router'
import { UserService } from '../../services/user/user.service'
import { inject } from '@angular/core'

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  return !userService.isLoggedIn
}
