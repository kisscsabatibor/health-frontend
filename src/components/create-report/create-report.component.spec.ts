import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CreateReportComponent } from './create-report.component'
import { HttpClient, HttpHandler } from '@angular/common/http'
import { TranslateModule } from '@ngx-translate/core'

describe('CreateReportComponent', () => {
  let component: CreateReportComponent
  let fixture: ComponentFixture<CreateReportComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateReportComponent, TranslateModule.forRoot()],
      providers: [HttpClient, HttpHandler],
    }).compileComponents()

    fixture = TestBed.createComponent(CreateReportComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
