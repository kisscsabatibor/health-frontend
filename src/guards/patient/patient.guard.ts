import { CanActivateFn } from '@angular/router'
import { AuthService } from '../../services/auth/auth.service'
import { inject } from '@angular/core'

export const patientGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  return !authService.isDoctor()
}
