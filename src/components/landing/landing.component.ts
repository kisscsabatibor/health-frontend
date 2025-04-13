import { Component, inject } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatCard } from '@angular/material/card'
import { Router, RouterLink } from '@angular/router'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'app-landing',
  imports: [TranslatePipe, MatCard, MatButton, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  private router = inject(Router)
  protected openPatientRegistration() {
    this.router.navigate(['/register'], { queryParams: { type: 'patient' } })
  }
  protected openDoctorRegistration() {
    this.router.navigate(['/register'], { queryParams: { type: 'doctor' } })
  }
}
