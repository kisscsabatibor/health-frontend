import { Routes } from '@angular/router'
import { LandingComponent } from '../components/landing/landing.component'
import { RegisterComponent } from '../components/register/register.component'
import { LoginComponent } from '../components/login/login.component'
import { ProfileComponent } from '../components/profile/profile.component'

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: LandingComponent },
]
