import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { HttpClient, HttpHandler } from '@angular/common/http'
import { TranslateModule } from '@ngx-translate/core'
import { ActivatedRoute } from '@angular/router'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TranslateModule.forRoot()],
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
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
