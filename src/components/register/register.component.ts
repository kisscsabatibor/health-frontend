import { Component, inject, OnInit } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormField } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { provideNativeDateAdapter } from '@angular/material/core'
import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatCheckbox } from '@angular/material/checkbox'
import { MatRadioModule } from '@angular/material/radio'
import { ActivatedRoute } from '@angular/router'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { AuthService } from '../../services/auth/auth.service'
import { UserService } from '../../services/user/user.service'

@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatFormField,
    MatInputModule,
    MatDatepickerModule,
    MatButton,
    MatIcon,
    MatCheckbox,
    MatRadioModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class RegisterComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute)
  private formBuilder = inject(FormBuilder)
  private userService = inject(UserService)

  registerForm = this.formBuilder.group(
    {
      role: ['patient'],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', Validators.required],
      passwordAgain: ['', Validators.required],
      birthDay: ['', Validators.required],
      accept: [false, Validators.requiredTrue],
    },
    {
      validator: this.passwordMatchValidator,
    },
  )

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.registerForm.patchValue({
        role: params.get('type'),
      })
    })
  }

  onSubmit() {
    this.userService
      .registerUser(this.registerForm.value)
      .subscribe((value) => {
        console.log(value)
      })
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value
    const confirmPassword = form.get('passwordAgain')?.value
    if (password !== confirmPassword) {
      return { passwordMismatch: true }
    }
    return null
  }
}
