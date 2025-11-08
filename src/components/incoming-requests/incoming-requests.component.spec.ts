import { ComponentFixture, TestBed } from '@angular/core/testing'

import { IncomingRequestsComponent } from './incoming-requests.component'
import { HttpClient, HttpHandler } from '@angular/common/http'
import { TranslateModule } from '@ngx-translate/core'

describe('IncomingRequestsComponent', () => {
  let component: IncomingRequestsComponent
  let fixture: ComponentFixture<IncomingRequestsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomingRequestsComponent, TranslateModule.forRoot()],
      providers: [HttpClient, HttpHandler],
    }).compileComponents()

    fixture = TestBed.createComponent(IncomingRequestsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
