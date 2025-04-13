import { Component } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatDialogActions, MatDialogModule } from '@angular/material/dialog'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'app-registration-success-dialog',
  imports: [TranslatePipe, MatDialogModule, MatDialogActions, MatButton],
  templateUrl: './registration-success-dialog.component.html',
  styleUrl: './registration-success-dialog.component.scss',
})
export class RegistrationSuccessDialogComponent {}
