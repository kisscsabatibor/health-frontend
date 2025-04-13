import { Component, inject } from '@angular/core'
import { RequestService } from '../../services/request/request.service'
import { RequestPayload } from '../../services/request/request'
import { MatCardModule } from '@angular/material/card'
import { MatIcon } from '@angular/material/icon'
import { DatePipe } from '@angular/common'
import { AssignmentService } from '../../services/assignment/assignment.service'
import { MatIconButton } from '@angular/material/button'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-incoming-requests',
  imports: [TranslatePipe, MatCardModule, MatIcon, DatePipe, MatIconButton],
  templateUrl: './incoming-requests.component.html',
  styleUrl: './incoming-requests.component.scss',
})
export class IncomingRequestsComponent {
  private requestService = inject(RequestService)
  private assignmentService = inject(AssignmentService)
  private translateService = inject(TranslateService)
  protected lang = this.translateService.currentLang
  protected requests: RequestPayload[] = []

  ngOnInit() {
    this.fetchData()
    this.translateService.onLangChange
      .asObservable()
      .subscribe((event) => (this.lang = event.lang))
  }

  fetchData() {
    this.requestService
      .getAllRequests()
      .subscribe((requests) => (this.requests = requests))
  }

  acceptRequest(doctorId: string) {
    this.assignmentService.createAssignment(doctorId).subscribe(() => {
      this.fetchData()
    })
  }

  removeRequest(request: RequestPayload) {
    this.requestService.deleteRequest(request._id).subscribe(() => {
      this.fetchData()
    })
  }
}
