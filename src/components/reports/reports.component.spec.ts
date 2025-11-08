import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ReportsComponent } from './reports.component'
import { TranslateModule } from '@ngx-translate/core'
import { HttpClient, HttpHandler } from '@angular/common/http'
import { ActivatedRoute } from '@angular/router'

describe('ReportsComponent', () => {
  let component: ReportsComponent
  let fixture: ComponentFixture<ReportsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsComponent, TranslateModule.forRoot()],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {} },
            queryParams: {},
          },
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(ReportsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
