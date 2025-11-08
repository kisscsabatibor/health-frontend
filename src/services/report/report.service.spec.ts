import { TestBed } from '@angular/core/testing'

import { ReportService } from './report.service'
import { HttpClient, HttpHandler } from '@angular/common/http'

describe('ReportService', () => {
  let service: ReportService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    })
    service = TestBed.inject(ReportService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
