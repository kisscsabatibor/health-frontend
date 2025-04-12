import { Component, inject, OnInit } from '@angular/core'
import { AssignmentService } from '../../services/assignment/assignment.service'
import { User } from '../../services/user/user'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { ReportPayload } from '../../services/report/report.payload'
import { MatCardModule } from '@angular/material/card'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-dashboard',
  imports: [MatFormFieldModule, MatSelectModule, MatCardModule, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private assignmentService = inject(AssignmentService)
  protected patients: User[] = []
  selectedPatientId: string | null = null
  protected reports: ReportPayload[] = []

  ngOnInit() {
    this.fetchData()
  }

  fetchData() {
    this.assignmentService
      .getAssignedPatients()
      .subscribe((patients) => (this.patients = patients))
  }

  updateTableData() {
    if (this.selectedPatientId) {
      this.assignmentService
        .getPatientReports(this.selectedPatientId)
        .subscribe((data) => {
          this.reports = data
          console.log(this.reports)
          console.log(this.selectedPatientId)
        })
    }
  }
}
