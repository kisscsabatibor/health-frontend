import { Routes } from '@angular/router'

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
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./../components/login/login.component').then(
        (c) => c.LoginComponent,
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./../components/profile/profile.component').then(
        (c) => c.ProfileComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./../components/landing/landing.component').then(
        (c) => c.LandingComponent,
      ),
  },
]
