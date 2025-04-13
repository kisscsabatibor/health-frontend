import { ResolveFn, Routes } from '@angular/router'
import { profileGuard } from '../guards/profile/profile.guard'
import { authGuard } from '../guards/auth/auth.guard'
import { patientGuard } from '../guards/patient/patient.guard'
import { doctorGuard } from '../guards/doctor/doctor.guard'
import { inject } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

function titleResolver(titleKey: string): ResolveFn<string> {
  return () => {
    const translate = inject(TranslateService)
    return translate.get(titleKey).toPromise()
  }
}

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./../components/landing/landing.component').then(
        (c) => c.LandingComponent,
      ),
    title: titleResolver('ROUTES.HOME'),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./../components/register/register.component').then(
        (c) => c.RegisterComponent,
      ),
    canActivate: [authGuard],
    title: titleResolver('ROUTES.REGISTER'),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./../components/login/login.component').then(
        (c) => c.LoginComponent,
      ),
    canActivate: [authGuard],
    title: titleResolver('ROUTES.LOGIN'),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./../components/profile/profile.component').then(
        (c) => c.ProfileComponent,
      ),
    canActivate: [profileGuard],
    title: titleResolver('ROUTES.PROFILE'),
  },
  {
    path: 'create-report',
    loadComponent: () =>
      import('./../components/create-report/create-report.component').then(
        (c) => c.CreateReportComponent,
      ),
    canActivate: [profileGuard, patientGuard],
    title: titleResolver('ROUTES.CREATE_REPORT'),
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./../components/reports/reports.component').then(
        (c) => c.ReportsComponent,
      ),
    canActivate: [profileGuard, patientGuard],
    title: titleResolver('ROUTES.REPORTS'),
  },
  {
    path: 'doctors',
    loadComponent: () =>
      import('./../components/doctors/doctors.component').then(
        (c) => c.DoctorsComponent,
      ),
    canActivate: [profileGuard, patientGuard],
    title: titleResolver('ROUTES.DOCTORS'),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./../components/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent,
      ),
    canActivate: [profileGuard, doctorGuard],
    title: titleResolver('ROUTES.DASHBOARD'),
  },
  {
    path: 'sendRequest',
    loadComponent: () =>
      import('./../components/send-request/send-request.component').then(
        (c) => c.SendRequestComponent,
      ),
    canActivate: [profileGuard, doctorGuard],
    title: titleResolver('ROUTES.SEND_REQUEST'),
  },
  {
    path: 'incomingRequests',
    loadComponent: () =>
      import(
        './../components/incoming-requests//incoming-requests.component'
      ).then((c) => c.IncomingRequestsComponent),
    canActivate: [profileGuard, patientGuard],
    title: titleResolver('ROUTES.INCOMING_REQUESTS'),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./../components/landing/landing.component').then(
        (c) => c.LandingComponent,
      ),
  },
]
