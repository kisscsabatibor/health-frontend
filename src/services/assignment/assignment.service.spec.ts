import { TestBed } from '@angular/core/testing'

import { AssignmentService } from './assignment.service'
import { HttpClient, HttpHandler } from '@angular/common/http'

describe('AssignmentService', () => {
  let service: AssignmentService

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [HttpClient, HttpHandler] })
    service = TestBed.inject(AssignmentService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
