import { Component, inject, OnInit } from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { AssignmentService } from '../../services/assignment/assignment.service'
import { User } from '../../services/user/user'
import { UserService } from '../../services/user/user.service'
import { combineLatest, map } from 'rxjs'
import { RequestService } from '../../services/request/request.service'
import { MatCardModule } from '@angular/material/card'
import { DatePipe } from '@angular/common'
import { RequestPayload } from '../../services/request/request'
import { MatButtonModule } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-send-request',
  imports: [
    TranslatePipe,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    DatePipe,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './send-request.component.html',
  styleUrl: './send-request.component.scss',
})
export class SendRequestComponent implements OnInit {
  private assignmentService = inject(AssignmentService)
  private userService = inject(UserService)
  private requestService = inject(RequestService)
  protected notAssignedPatients: User[] = []
  selectedPatientId: string | null = null
  protected requests: RequestPayload[] = []
  private translateService = inject(TranslateService)
  protected lang = this.translateService.currentLang

  ngOnInit() {
    this.fetchData()
    this.translateService.onLangChange
      .asObservable()
      .subscribe((event) => (this.lang = event.lang))
  }

  fetchData() {
    combineLatest([
      this.userService.getPatients(),
      this.assignmentService.getAssignedPatients(),
      this.requestService.getAllRequests(),
    ]).subscribe(([allPatients, assignedPatients, requests]) => {
      const assignedIds = new Set(assignedPatients.map((p) => p._id))
      const requestIds = new Set(requests.map((r) => r.patient._id))
      this.notAssignedPatients = allPatients.filter(
        (p) => !assignedIds.has(p._id) && !requestIds.has(p._id),
      )
    })
    this.requestService.getAllRequests().subscribe((requests) => {
      this.requests = requests
    })
  }

  getPatientName(patientId: string) {
    return this.userService
      .getPatients()
      .pipe(
        map(
          (patient) =>
            patient.find((patient) => patient._id === patientId)?.name,
        ),
      )
  }

  sendRequest() {
    if (this.selectedPatientId) {
      this.requestService
        .createRequest(this.selectedPatientId)
        .subscribe(() => {
          this.fetchData()
        })
    }
  }

  removeRequest(request: RequestPayload) {
    this.requestService.deleteRequest(request._id).subscribe(() => {
      this.fetchData()
    })
  }
}
