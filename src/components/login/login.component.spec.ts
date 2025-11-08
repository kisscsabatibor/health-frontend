import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing'
import { LoginComponent } from './login.component'
import { TranslateModule } from '@ngx-translate/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { UserService } from '../../services/user/user.service'
import { of } from 'rxjs'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>
  let mockUserService: jasmine.SpyObj<UserService>
  let mockRouter: jasmine.SpyObj<Router>

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['loginUser'], {
      isLoggedIn: false,
    })
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl'])

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot(), LoginComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Form validation', () => {
    it('should mark email as required', () => {
      const emailControl = component.loginForm.controls['email']
      emailControl.setValue('')
      component.updateEmailErrorMessage()
      expect(component.emailErrorMessage()).toBe('MANDATORY_VALUE')
    })

    it('should mark email as invalid', () => {
      const emailControl = component.loginForm.controls['email']
      emailControl.setValue('invalid-email')
      component.updateEmailErrorMessage()
      expect(component.emailErrorMessage()).toBe('MANDATORY_EMAIL')
    })

    it('should clear email error when valid', () => {
      const emailControl = component.loginForm.controls['email']
      emailControl.setValue('test@example.com')
      component.updateEmailErrorMessage()
      expect(component.emailErrorMessage()).toBe('')
    })

    it('should mark password as required', () => {
      const passwordControl = component.loginForm.controls['password']
      passwordControl.setValue('')
      component.updatePasswordErrorMessage()
      expect(component.passwordErrorMessage()).toBe('MANDATORY_VALUE')
    })

    it('should clear password error when filled', () => {
      const passwordControl = component.loginForm.controls['password']
      passwordControl.setValue('123456')
      component.updatePasswordErrorMessage()
      expect(component.passwordErrorMessage()).toBe('')
    })
  })

  describe('onSubmit', () => {
    it('should login successfully and navigate to profile', fakeAsync(() => {
      component.loginForm.setValue({
        email: 'test@example.com',
        password: '123',
      })
      mockUserService.loginUser.and.returnValue(
        of({ token: '12345', status: 200 }),
      )

      component.onSubmit()
      tick()

      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('profile')
    }))

    it('should handle 401 error', fakeAsync(() => {
      component.loginForm.setValue({
        email: 'test@example.com',
        password: 'wrong',
      })
      mockUserService.loginUser.and.returnValue(of({ status: 401 }))

      component.onSubmit()
      tick()

      expect(component.formError()).toBe('WRONG_EMAIL')
    }))

    it('should handle other errors', fakeAsync(() => {
      component.loginForm.setValue({
        email: 'test@example.com',
        password: 'wrong',
      })
      mockUserService.loginUser.and.returnValue(of({ status: 500 }))

      component.onSubmit()
      tick()

      expect(component.formError()).toBe('CHANGES_SAVE_ERROR')
    }))
  })
})
