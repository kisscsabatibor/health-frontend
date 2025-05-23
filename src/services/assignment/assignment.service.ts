import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { BACKEND_URL } from '../auth/auth.payload'
import { User } from '../user/user'
import { catchError, of } from 'rxjs'
import { ReportPayload } from '../report/report.payload'

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  private http = inject(HttpClient)

  public createAssignment(doctorId: string) {
    return this.http
      .post(BACKEND_URL + '/api/assignment/assign', { doctorId })
      .pipe(catchError((err) => of(err)))
  }

  public deleteAssignment(doctorId: string) {
    return this.http
      .delete(BACKEND_URL + '/api/assignment/assign', {
        body: { doctorId: doctorId },
      })
      .pipe(catchError((err) => of(err)))
  }

  public getAssignedDoctors() {
    return this.http.get<User[]>(
      BACKEND_URL + '/api/assignment/assignedDoctors',
    )
  }

  public getAssignedPatients() {
    return this.http.get<User[]>(
      BACKEND_URL + '/api/assignment/assignedPatients',
    )
  }

  public getPatientReports(patientId: string) {
    return this.http.get<ReportPayload[]>(
      BACKEND_URL + `/api/assignment/patientReports/${patientId}`,
    )
  }
}
