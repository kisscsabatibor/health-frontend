import {
  AfterViewChecked,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core'
import { ReportPayload } from '../../services/report/report.payload'
import { ReportService } from '../../services/report/report.service'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatCardModule } from '@angular/material/card'
import { MatIcon } from '@angular/material/icon'
import { MatButton, MatIconButton } from '@angular/material/button'
import { filter, switchMap } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'
import { DeleteReportConfirmationDialogComponent } from '../../dialogs/delete-report-confirmation-dialog/delete-report-confirmation-dialog.component'
import { DatePipe } from '@angular/common'
import { RouterLink } from '@angular/router'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-reports',
  imports: [
    TranslatePipe,
    MatTableModule,
    MatCardModule,
    MatIcon,
    MatIconButton,
    DatePipe,
    MatButton,
    RouterLink,
    MatSortModule,
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent implements OnInit, AfterViewChecked {
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
  private translateService = inject(TranslateService)
  protected lang = this.translateService.currentLang

  @ViewChild(MatSort) sort!: MatSort

  ngOnInit() {
    this.translateService.onLangChange
      .asObservable()
      .subscribe((event) => (this.lang = event.lang))
    this.reportService.getReports().subscribe((reports) => {
      this.dataSource.data = reports
      this.dataSource.sort = this.sort
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'createdAt':
            return new Date(item.createdAt).getTime()
          case 'pulse':
          case 'weight':
          case 'bloodSugar':
            return Number(item[property]) || 0
          case 'bloodPressure':
            return Number(item.bloodPressure?.split('/') || []) || 0
          default:
            return ''
        }
      }
    })
  }

  ngAfterViewChecked() {
    this.dataSource.sort = this.sort
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
