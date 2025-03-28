import { Component, inject } from '@angular/core'
import { ReportService } from '../../services/report/report.service'
import { ReportPayload } from '../../services/report/report.payload'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatCardModule } from '@angular/material/card'
import { MatIcon } from '@angular/material/icon'
import { MatIconButton } from '@angular/material/button'

@Component({
  selector: 'app-reports',
  imports: [MatTableModule, MatCardModule, MatIcon, MatIconButton],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  private reportService = inject(ReportService)
  displayedColumns: string[] = [
    'pulse',
    'weight',
    'bloodSugar',
    'bloodPressure',
    'actions',
  ]
  dataSource = new MatTableDataSource<ReportPayload>([])

  ngOnInit() {
    this.reportService.getReports().subscribe((reports) => {
      console.log(reports)
      this.dataSource.data = reports
    })
  }

  deleteReport(reportId: string) {
    this.reportService.deleteReport(reportId).subscribe((value) => {
      this.reportService.getReports().subscribe((reports) => {
        this.dataSource.data = reports
      })
    })
  }
}
