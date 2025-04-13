import { Component, inject } from '@angular/core'
import { MatButton } from '@angular/material/button'
import {
  MatDialogModule,
  MatDialogActions,
  MatDialogRef,
} from '@angular/material/dialog'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'app-delete-profile-confirmation-dialog',
  imports: [TranslatePipe, MatDialogModule, MatDialogActions, MatButton],
  templateUrl: './delete-profile-confirmation-dialog.component.html',
  styleUrl: './delete-profile-confirmation-dialog.component.scss',
})
export class DeleteProfileConfirmationDialogComponent {
  readonly dialogRef = inject(
    MatDialogRef<DeleteProfileConfirmationDialogComponent>,
  )
  deleteAccount() {
    this.dialogRef.close(true)
  }
}
