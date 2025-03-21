import { Component } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatDialogActions, MatDialogModule } from '@angular/material/dialog'

@Component({
  selector: 'app-registration-success-dialog',
  imports: [MatDialogModule, MatDialogActions, MatButton],
  templateUrl: './registration-success-dialog.component.html',
  styleUrl: './registration-success-dialog.component.scss',
})
export class RegistrationSuccessDialogComponent {}
