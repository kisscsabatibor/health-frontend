import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { UserService } from '../../services/user/user.service'

export const profileGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  return userService.isLoggedIn
}
