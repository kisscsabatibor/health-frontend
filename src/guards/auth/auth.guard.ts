import { CanActivateFn } from '@angular/router'
import { UserService } from '../../services/user/user.service'
import { inject } from '@angular/core'

export const authGuard: CanActivateFn = () => {
  const userService = inject(UserService)
  return !userService.isLoggedIn
}
