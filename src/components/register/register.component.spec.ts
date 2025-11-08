import { of } from 'rxjs'
import { ActivatedRoute, convertToParamMap } from '@angular/router'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClient, HttpHandler } from '@angular/common/http'
import { TranslateModule } from '@ngx-translate/core'
import { RegisterComponent } from './register.component'

describe('RegisterComponent', () => {
  let component: RegisterComponent
  let fixture: ComponentFixture<RegisterComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, TranslateModule.forRoot()],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {} },
            queryParamMap: of(convertToParamMap({ type: 'patient' })),
          },
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(RegisterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
