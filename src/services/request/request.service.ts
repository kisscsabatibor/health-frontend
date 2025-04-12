import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { BACKEND_URL } from '../auth/auth.payload'
import { RequestPayload } from './request'

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private http = inject(HttpClient)

  public createRequest(patientId: string) {
    return this.http.post(BACKEND_URL + '/api/request/createRequest', {
      patientId,
    })
  }

  public getAllRequests() {
    return this.http.get<RequestPayload[]>(
      BACKEND_URL + '/api/request/getRequests',
    )
  }

  public deleteRequest(requestId: string) {
    return this.http.delete(BACKEND_URL + '/api/request/deleteRequest', {
      body: { requestId },
    })
  }
}
