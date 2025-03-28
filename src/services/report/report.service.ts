import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { ReportPayload } from './report.payload'
import { BACKEND_URL } from '../auth/auth.payload'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private http = inject(HttpClient)

  public createReport(reportPayload: ReportPayload) {
    return this.http.post(
      BACKEND_URL + '/api/report/createReport',
      reportPayload,
    )
  }

  public getReports(): Observable<ReportPayload[]> {
    return this.http.get<ReportPayload[]>(BACKEND_URL + '/api/report/reports')
  }

  public deleteReport(reportId: string) {
    return this.http.delete(
      BACKEND_URL + `/api/report/deleteReport/${reportId}`,
    )
  }
}
