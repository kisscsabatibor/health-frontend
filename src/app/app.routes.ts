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
    title: 'Health | Home',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./../components/register/register.component').then(
        (c) => c.RegisterComponent,
      ),
    canActivate: [authGuard],
    title: 'Health | Registration',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./../components/login/login.component').then(
        (c) => c.LoginComponent,
      ),
    canActivate: [authGuard],
    title: 'Health | Login',
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./../components/profile/profile.component').then(
        (c) => c.ProfileComponent,
      ),
    canActivate: [profileGuard],
    title: 'Health | Profile',
  },
  {
    path: 'create-report',
    loadComponent: () =>
      import('./../components/create-report/create-report.component').then(
        (c) => c.CreateReportComponent,
      ),
    canActivate: [profileGuard, patientGuard],
    title: 'Health | Create report',
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./../components/reports/reports.component').then(
        (c) => c.ReportsComponent,
      ),
    canActivate: [profileGuard, patientGuard],
    title: 'Health | Reports',
  },
  {
    path: 'doctors',
    loadComponent: () =>
      import('./../components/doctors/doctors.component').then(
        (c) => c.DoctorsComponent,
      ),
    canActivate: [profileGuard, patientGuard],
    title: 'Health | Doctors',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./../components/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent,
      ),
    canActivate: [profileGuard, doctorGuard],
    title: 'Health | Patient dashboard',
  },
  {
    path: 'sendRequest',
    loadComponent: () =>
      import('./../components/send-request/send-request.component').then(
        (c) => c.SendRequestComponent,
      ),
    canActivate: [profileGuard, doctorGuard],
    title: 'Health | Requests',
  },
  {
    path: 'incomingRequests',
    loadComponent: () =>
      import(
        './../components/incoming-requests//incoming-requests.component'
      ).then((c) => c.IncomingRequestsComponent),
    canActivate: [profileGuard, patientGuard],
    title: 'Health | Requests',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./../components/landing/landing.component').then(
        (c) => c.LandingComponent,
      ),
  },
]
