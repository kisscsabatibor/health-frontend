import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SendRequestComponent } from './send-request.component'
import { HttpClient, HttpHandler } from '@angular/common/http'
import { TranslateModule } from '@ngx-translate/core'

describe('SendRequestComponent', () => {
  let component: SendRequestComponent
  let fixture: ComponentFixture<SendRequestComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendRequestComponent, TranslateModule.forRoot()],
      providers: [HttpClient, HttpHandler],
    }).compileComponents()

    fixture = TestBed.createComponent(SendRequestComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
