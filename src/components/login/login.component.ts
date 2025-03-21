import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButton } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { UserService } from '../../services/user/user.service'
import { LoginPayload } from '../../services/auth/auth.payload'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    MatButton,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder)
  private userService = inject(UserService)
  private router = inject(Router)
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  onSubmit() {
    this.userService
      .loginUser(this.loginForm.value as LoginPayload)
      .subscribe(() => {
        this.router.navigateByUrl('profile')
      })
  }
}
