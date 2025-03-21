import { Component, inject, signal } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButton } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { UserService } from '../../services/user/user.service'
import { LoginPayload } from '../../services/auth/auth.payload'
import { Router } from '@angular/router'
import { MatIcon } from '@angular/material/icon'

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    MatButton,
    ReactiveFormsModule,
    MatIcon,
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
  emailErrorMessage = signal('')
  passwordErrorMessage = signal('')
  formError = signal('')

  onSubmit() {
    this.userService
      .loginUser(this.loginForm.value as LoginPayload)
      .subscribe((response) => {
        if (response.token) {
          this.router.navigateByUrl('profile')
        }
        if (response.status === 401) {
          this.formError.set('Wrong e-mail and/or password! Please try again.')
        } else {
          this.formError.set('Something went wrong please try again later.')
        }
      })
  }
  updateEmailErrorMessage() {
    const emailFormControl = this.loginForm.controls['email']
    if (emailFormControl.hasError('required')) {
      this.emailErrorMessage.set('You must enter a value')
    } else if (emailFormControl.hasError('email')) {
      this.emailErrorMessage.set('You must enter a valid email')
    } else {
      this.emailErrorMessage.set('')
    }
  }

  updatePasswordErrorMessage() {
    const passwordFormControl = this.loginForm.controls['password']
    if (passwordFormControl.hasError('required')) {
      this.passwordErrorMessage.set('You must enter a value')
    } else {
      this.passwordErrorMessage.set('')
    }
  }
}
