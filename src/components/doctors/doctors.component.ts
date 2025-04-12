import { Component, inject } from '@angular/core'
import { User } from '../../services/user/user'
import { UserService } from '../../services/user/user.service'
import { MatCardModule } from '@angular/material/card'
import { AssignmentService } from '../../services/assignment/assignment.service'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-doctors',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss',
})
export class DoctorsComponent {
  doctors: User[] = []
  assignedDoctors: User[] = []
  private userService = inject(UserService)
  private assignmentService = inject(AssignmentService)
  messageState: 'empty' | 'success' | 'error' = 'empty'

  ngOnInit() {
    this.fetchData()
  }

  fetchData() {
    this.userService
      .getDoctors()
      .subscribe((doctors) => (this.doctors = doctors))
    this.assignmentService
      .getAssignedDoctors()
      .subscribe((assignedDoctors) => (this.assignedDoctors = assignedDoctors))
  }

  isAssigned(doctor: User): boolean {
    return this.assignedDoctors.some((d) => d._id === doctor._id)
  }

  createAssignment(doctor: User) {
    this.assignmentService
      .createAssignment(doctor._id)
      .subscribe((response) => {
        const success = !response.error
        success
          ? (this.messageState = 'success')
          : (this.messageState = 'error')
        this.fetchData()
      })
  }

  deleteAssignment(doctor: User) {
    this.assignmentService
      .deleteAssignment(doctor._id)
      .subscribe((response) => {
        const success = !response.error
        success
          ? (this.messageState = 'success')
          : (this.messageState = 'error')
        this.fetchData()
      })
  }
}
