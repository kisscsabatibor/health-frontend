import { inject } from '@angular/core'
import { CanActivateFn } from '@angular/router'
import { UserService } from '../../services/user/user.service'

export const profileGuard: CanActivateFn = () => {
  const userService = inject(UserService)
  return userService.isLoggedIn
}
