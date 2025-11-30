import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing'
import { RegisterComponent } from './register.component'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router'
import { UserService } from '../../services/user/user.service'
import { of } from 'rxjs'

describe('RegisterComponent', () => {
  let component: RegisterComponent
  let fixture: ComponentFixture<RegisterComponent>
  let userServiceSpy: jasmine.SpyObj<UserService>
  let routerSpy: jasmine.SpyObj<Router>
  let dialogSpy: jasmine.SpyObj<MatDialog>

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['registerUser'])
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl'])
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open'])

    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of(convertToParamMap({ type: 'patient' })),
            snapshot: { params: {} },
          },
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(RegisterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize the form with default values', () => {
    const form = component.registerForm.value
    expect(form.role).toBe('patient')
    expect(form.email).toBe('')
    expect(form.name).toBe('')
    expect(form.password).toBe('')
    expect(form.passwordAgain).toBe('')
    expect(form.birthDay).toBe('')
    expect(form.accept).toBeFalse()
  })

  describe('Validators', () => {
    it('should return null if passwords match', () => {
      component.registerForm.controls['password'].setValue('12345678')
      component.registerForm.controls['passwordAgain'].setValue('12345678')
      const error = component.passwordMatchValidator()(
        component.registerForm.controls['passwordAgain'],
      )
      expect(error).toBeNull()
    })
  })

  describe('Error message updates', () => {
    it('should set email error message for required', () => {
      component.registerForm.controls['email'].setErrors({ required: true })
      component.updateEmailErrorMessage()
      expect(component.emailErrorMessage()).toBe(
        'REGISTER.ERRORS.EMAIL_REQUIRED',
      )
    })

    it('should set email error message for invalid email', () => {
      component.registerForm.controls['email'].setErrors({ email: true })
      component.updateEmailErrorMessage()
      expect(component.emailErrorMessage()).toBe(
        'REGISTER.ERRORS.EMAIL_INVALID',
      )
    })

    it('should set birthDay error message for required', () => {
      component.registerForm.controls['birthDay'].setErrors({ required: true })
      component.updateBirthDayErrorMessage()
      expect(component.birthDayErrorMessage()).toBe(
        'REGISTER.ERRORS.BIRTHDAY_REQUIRED',
      )
    })

    it('should set birthDay error message for future date', () => {
      component.registerForm.controls['birthDay'].setErrors({
        futureDate: true,
      })
      component.updateBirthDayErrorMessage()
      expect(component.birthDayErrorMessage()).toBe(
        'REGISTER.ERRORS.BIRTHDAY_FUTURE',
      )
    })
  })

  describe('onSubmit', () => {
    it('should set formError if email exists error returned', fakeAsync(() => {
      userServiceSpy.registerUser.and.returnValue(
        of({ error: { error: 'E11000 duplicate key' } }),
      )
      component.onSubmit()
      tick()
      expect(component.formError()).toBe('REGISTER.ERRORS.EMAIL_EXISTS')
    }))

    it('should set formError for unknown error', fakeAsync(() => {
      userServiceSpy.registerUser.and.returnValue(
        of({ error: { error: 'Some other error' } }),
      )
      component.onSubmit()
      tick()
      expect(component.formError()).toBe('REGISTER.ERRORS.UNKNOWN')
    }))

    it('should open dialog if registration succeeds', fakeAsync(() => {
      const dialogRefSpyObj = jasmine.createSpyObj({
        afterClosed: of({}),
        close: null,
      })
      dialogSpy.open.and.returnValue(dialogRefSpyObj)
      userServiceSpy.registerUser.and.returnValue(of({}))
      component.onSubmit()
      tick()
      expect(dialogSpy.open).toHaveBeenCalled()
      tick()
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('login')
    }))
  })
})
