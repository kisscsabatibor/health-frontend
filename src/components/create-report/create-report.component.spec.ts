import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CreateReportComponent } from './create-report.component'
import { FormBuilder } from '@angular/forms'
import { ReportService } from '../../services/report/report.service'
import { Router } from '@angular/router'
import { of } from 'rxjs'
import { TranslateModule } from '@ngx-translate/core'

describe('CreateReportComponent', () => {
  let component: CreateReportComponent
  let fixture: ComponentFixture<CreateReportComponent>
  let mockReportService: jasmine.SpyObj<ReportService>
  let mockRouter: jasmine.SpyObj<Router>

  beforeEach(async () => {
    mockReportService = jasmine.createSpyObj('ReportService', ['createReport'])
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl'])

    await TestBed.configureTestingModule({
      imports: [CreateReportComponent, TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        { provide: ReportService, useValue: mockReportService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(CreateReportComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize the form with expected controls', () => {
    const controls = component.reportForm.controls
    expect(controls['pulse']).toBeDefined()
    expect(controls['bloodPressure']).toBeDefined()
    expect(controls['weight']).toBeDefined()
    expect(controls['bloodSugar']).toBeDefined()
  })

  describe('form validation', () => {
    it('should mark pulse as invalid if out of range', () => {
      const pulseControl = component.reportForm.get('pulse')
      pulseControl?.setValue(10)
      expect(pulseControl?.valid).toBeFalse()

      pulseControl?.setValue(250)
      expect(pulseControl?.valid).toBeFalse()

      pulseControl?.setValue(80)
      expect(pulseControl?.valid).toBeTrue()
    })

    it('should mark weight as invalid if out of range', () => {
      const weightControl = component.reportForm.get('weight')
      weightControl?.setValue(20)
      expect(weightControl?.valid).toBeFalse()

      weightControl?.setValue(150)
      expect(weightControl?.valid).toBeTrue()
    })
  })

  describe('isAtLeastOneFieldFilled', () => {
    it('should return false if all fields are empty', () => {
      component.reportForm.setValue({
        pulse: '',
        bloodPressure: '',
        weight: '',
        bloodSugar: '',
      })
      expect(component.isAtLeastOneFieldFilled()).toBeFalse()
    })

    it('should return true if at least one field has a value', () => {
      component.reportForm.setValue({
        pulse: '',
        bloodPressure: '120/80',
        weight: '',
        bloodSugar: '',
      })
      expect(component.isAtLeastOneFieldFilled()).toBeTrue()
    })
  })

  describe('submitReport', () => {
    it('should not call reportService if form is invalid', () => {
      component.reportForm.setValue({
        pulse: 10,
        bloodPressure: '',
        weight: '',
        bloodSugar: '',
      })
      component.submitReport()
      expect(mockReportService.createReport).not.toHaveBeenCalled()
    })

    it('should call reportService.createReport and navigate if form is valid', () => {
      const mockResponse = of({})
      mockReportService.createReport.and.returnValue(mockResponse)

      component.reportForm.setValue({
        pulse: 80,
        bloodPressure: '120/80',
        weight: 70,
        bloodSugar: 5,
      })

      component.submitReport()
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('reports')
    })
  })
})
