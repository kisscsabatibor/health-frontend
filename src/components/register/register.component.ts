import { Component, inject, OnInit, signal } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormField } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { provideNativeDateAdapter } from '@angular/material/core'
import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatCheckbox } from '@angular/material/checkbox'
import { MatRadioModule } from '@angular/material/radio'
import { ActivatedRoute, Router } from '@angular/router'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import { AuthService } from '../../services/auth/auth.service'
import { UserService } from '../../services/user/user.service'
import { RegistrationPayload } from '../../services/auth/auth.payload'
import { MatDialog } from '@angular/material/dialog'
import { RegistrationSuccessDialogComponent } from '../../dialogs/registration-success-dialog/registration-success-dialog.component'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'

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
    TranslatePipe,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class RegisterComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute)
  private formBuilder = inject(FormBuilder)
  private userService = inject(UserService)
  private translateService = inject(TranslateService)
  private router = inject(Router)
  readonly dialog = inject(MatDialog)

  registerForm = this.formBuilder.group({
    role: ['patient', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    passwordAgain: ['', [Validators.required, this.passwordMatchValidator()]],
    birthDay: ['', [Validators.required, this.birthDayValidator()]],
    accept: [false, Validators.requiredTrue],
  })

  emailErrorMessage = signal('')
  nameErrorMessage = signal('')
  birthDayErrorMessage = signal('')
  acceptErrorMessage = signal('')
  formError = signal('')

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.registerForm.patchValue({
        role: params.get('type'),
      })
    })
  }

  onSubmit() {
    this.userService
      .registerUser(this.registerForm.value as RegistrationPayload)
      .subscribe((response) => {
        const errorMessage: string = response?.error?.error
        if (errorMessage?.startsWith('E11000')) {
          this.formError.set(
            this.translateService.instant('REGISTER.ERRORS.EMAIL_EXISTS'),
          )
        } else if (errorMessage) {
          this.formError.set(
            this.translateService.instant('REGISTER.ERRORS.UNKNOWN'),
          )
        } else {
          this.openDialog()
        }
      })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegistrationSuccessDialogComponent, {
      data: {},
    })

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('login')
    })
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = this.registerForm?.controls['password'].value
      const confirmPassword = control.value

      return password && confirmPassword && password !== confirmPassword
        ? { passwordMismatch: true }
        : null
    }
  }

  birthDayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null
      const selectedDate = new Date(control.value)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      return selectedDate > today ? { futureDate: true } : null
    }
  }

  updateBirthDayErrorMessage() {
    const birthDayFormControl = this.registerForm.controls['birthDay']
    if (birthDayFormControl.hasError('required')) {
      this.birthDayErrorMessage.set(
        this.translateService.instant('REGISTER.ERRORS.BIRTHDAY_REQUIRED'),
      )
    } else if (birthDayFormControl.hasError('futureDate')) {
      this.birthDayErrorMessage.set(
        this.translateService.instant('REGISTER.ERRORS.BIRTHDAY_FUTURE'),
      )
    } else {
      this.birthDayErrorMessage.set('')
    }
  }

  updateEmailErrorMessage() {
    const emailFormControl = this.registerForm.controls['email']
    if (emailFormControl.hasError('required')) {
      this.emailErrorMessage.set(
        this.translateService.instant('REGISTER.ERRORS.EMAIL_REQUIRED'),
      )
    } else if (emailFormControl.hasError('email')) {
      this.emailErrorMessage.set(
        this.translateService.instant('REGISTER.ERRORS.EMAIL_INVALID'),
      )
    } else {
      this.emailErrorMessage.set('')
    }
  }

  updateNameErrorMessage() {
    const nameFormControl = this.registerForm.controls['name']
    if (nameFormControl.hasError('required')) {
      this.nameErrorMessage.set(
        this.translateService.instant('REGISTER.ERRORS.NAME_REQUIRED'),
      )
    } else {
      this.nameErrorMessage.set('')
    }
  }
}
