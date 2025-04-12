import { Routes } from '@angular/router'
import { profileGuard } from '../guards/profile/profile.guard'
import { authGuard } from '../guards/auth/auth.guard'
import { patientGuard } from '../guards/patient/patient.guard'
import { doctorGuard } from '../guards/doctor/doctor.guard'

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
    canActivate: [profileGuard, patientGuard],
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./../components/reports/reports.component').then(
        (c) => c.ReportsComponent,
      ),
    canActivate: [profileGuard, patientGuard],
  },
  {
    path: 'doctors',
    loadComponent: () =>
      import('./../components/doctors/doctors.component').then(
        (c) => c.DoctorsComponent,
      ),
    canActivate: [profileGuard, patientGuard],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./../components/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent,
      ),
    canActivate: [profileGuard, doctorGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./../components/landing/landing.component').then(
        (c) => c.LandingComponent,
      ),
  },
]
