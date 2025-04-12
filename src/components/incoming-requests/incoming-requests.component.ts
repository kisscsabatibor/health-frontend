import { Component, inject } from '@angular/core'
import { combineLatest, map, switchMap } from 'rxjs'
import { RequestService } from '../../services/request/request.service'
import { RequestPayload } from '../../services/request/request'
import { UserService } from '../../services/user/user.service'
import { MatCardModule } from '@angular/material/card'
import { MatIcon } from '@angular/material/icon'
import { DatePipe } from '@angular/common'
import { AssignmentService } from '../../services/assignment/assignment.service'
import { MatIconButton } from '@angular/material/button'

@Component({
  selector: 'app-incoming-requests',
  imports: [MatCardModule, MatIcon, DatePipe, MatIconButton],
  templateUrl: './incoming-requests.component.html',
  styleUrl: './incoming-requests.component.scss',
})
export class IncomingRequestsComponent {
  private requestService = inject(RequestService)
  private assignmentService = inject(AssignmentService)
  protected requests: RequestPayload[] = []

  ngOnInit() {
    this.fetchData()
  }

  fetchData() {
    this.requestService
      .getAllRequests()
      .subscribe((requests) => (this.requests = requests))
  }

  acceptRequest(doctorId: string, requestId: string) {
    this.assignmentService
      .createAssignment(doctorId)
      .pipe(switchMap(() => this.requestService.deleteRequest(requestId)))
      .subscribe(() => {
        this.fetchData()
      })
  }

  removeRequest(request: RequestPayload) {
    this.requestService.deleteRequest(request._id).subscribe(() => {
      this.fetchData()
    })
  }
}
