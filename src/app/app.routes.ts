import { Routes } from '@angular/router'
import { profileGuard } from '../guards/profile/profile.guard'
import { authGuard } from '../guards/auth/auth.guard'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./../components/landing/landing.component').then(
        (c) => c.LandingComponent,
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./../components/register/register.component').then(
        (c) => c.RegisterComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./../components/login/login.component').then(
        (c) => c.LoginComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./../components/profile/profile.component').then(
        (c) => c.ProfileComponent,
      ),
    canActivate: [profileGuard],
  },
  {
    path: 'create-report',
    loadComponent: () =>
      import('./../components/create-report/create-report.component').then(
        (c) => c.CreateReportComponent,
      ),
    canActivate: [profileGuard],
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./../components/reports/reports.component').then(
        (c) => c.ReportsComponent,
      ),
    canActivate: [profileGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./../components/landing/landing.component').then(
        (c) => c.LandingComponent,
      ),
  },
]
