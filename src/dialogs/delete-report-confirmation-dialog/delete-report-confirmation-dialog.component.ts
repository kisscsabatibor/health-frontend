import { Component, inject } from '@angular/core'
import { MatButton } from '@angular/material/button'
import {
  MatDialogModule,
  MatDialogActions,
  MatDialogRef,
} from '@angular/material/dialog'
import { DeleteProfileConfirmationDialogComponent } from '../delete-profile-confirmation-dialog/delete-profile-confirmation-dialog.component'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'app-delete-report-confirmation-dialog',
  imports: [TranslatePipe, MatDialogModule, MatDialogActions, MatButton],
  templateUrl: './delete-report-confirmation-dialog.component.html',
  styleUrl: './delete-report-confirmation-dialog.component.scss',
})
export class DeleteReportConfirmationDialogComponent {
  readonly dialogRef = inject(
    MatDialogRef<DeleteProfileConfirmationDialogComponent>,
  )
  deleteReport() {
    this.dialogRef.close(true)
  }
}
