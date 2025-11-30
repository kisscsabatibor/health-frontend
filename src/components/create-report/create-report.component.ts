import { Component, inject } from '@angular/core'
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'
import { MatButton } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { ReportService } from '../../services/report/report.service'
import { Router } from '@angular/router'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'app-create-report',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatButton,
    TranslatePipe,
  ],
  templateUrl: './create-report.component.html',
  styleUrl: './create-report.component.scss',
})
export class CreateReportComponent {
  reportForm: FormGroup
  private reportService = inject(ReportService)
  private router = inject(Router)
  private fb = inject(FormBuilder)

  constructor() {
    this.reportForm = this.fb.group({
      pulse: ['', [Validators.min(30), Validators.max(200)]],
      bloodPressure: [''],
      weight: ['', [Validators.min(30), Validators.max(300)]],
      bloodSugar: ['', [Validators.min(0), Validators.max(50)]],
    })
  }

  submitReport() {
    if (this.reportForm.valid) {
      this.reportService.createReport(this.reportForm.value).subscribe(() => {
        this.router.navigateByUrl('reports')
      })
    }
  }

  isAtLeastOneFieldFilled(): boolean {
    return Object.values(this.reportForm.value).some((value) => value)
  }
}
