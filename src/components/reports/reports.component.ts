import { Component, inject } from '@angular/core'
import { ReportService } from '../../services/report/report.service'
import { ReportPayload } from '../../services/report/report.payload'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatCardModule } from '@angular/material/card'
import { MatIcon } from '@angular/material/icon'
import { MatIconButton } from '@angular/material/button'
import { filter, switchMap } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'
import { DeleteReportConfirmationDialogComponent } from '../../dialogs/delete-report-confirmation-dialog/delete-report-confirmation-dialog.component'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-reports',
  imports: [MatTableModule, MatCardModule, MatIcon, MatIconButton, DatePipe],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  private reportService = inject(ReportService)
  displayedColumns: string[] = [
    'createdAt',
    'pulse',
    'weight',
    'bloodSugar',
    'bloodPressure',
    'actions',
  ]
  dataSource = new MatTableDataSource<ReportPayload>([])
  readonly dialog = inject(MatDialog)

  ngOnInit() {
    this.reportService.getReports().subscribe((reports) => {
      this.dataSource.data = reports
    })
  }

  deleteReport(reportId: string) {
    const dialogRef = this.dialog.open(
      DeleteReportConfirmationDialogComponent,
      {
        data: {},
      },
    )

    dialogRef
      .afterClosed()
      .pipe(filter((res) => res))
      .pipe(switchMap(() => this.reportService.deleteReport(reportId)))
      .pipe(switchMap(() => this.reportService.getReports()))
      .subscribe((reports) => {
        this.dataSource.data = reports
      })
  }
}
