import { Component, inject } from '@angular/core'
import { UserService } from '../../services/user/user.service'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { User } from '../../services/user/user'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatInput } from '@angular/material/input'
import { MatButton } from '@angular/material/button'

@Component({
  selector: 'app-profile',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInput,
    MatButton,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private userService = inject(UserService)
  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthDay: new FormControl(''),
    role: new FormControl(''),
  })

  constructor() {
    this.userService.getProfile().subscribe((value: any) => {
      const userData = {
        email: value.email,
        name: value.name,
        birthDay: value.birthDay,
        role: value.role,
      }
      this.profileForm.setValue(userData)
      this.profileForm.controls['birthDay'].disable()
      this.profileForm.controls['role'].disable()
    })
  }

  saveChanges() {}
}
