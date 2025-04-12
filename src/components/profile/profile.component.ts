import { Component, inject } from '@angular/core'
import { UserService } from '../../services/user/user.service'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatInput } from '@angular/material/input'
import { MatButton } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { DeleteProfileConfirmationDialogComponent } from '../../dialogs/delete-profile-confirmation-dialog/delete-profile-confirmation-dialog.component'
import { filter, switchMap } from 'rxjs'
import { Router } from '@angular/router'
import { User } from '../../services/user/user'

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
  private router = inject(Router)
  readonly dialog = inject(MatDialog)

  profileForm = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthDay: new FormControl(''),
    role: new FormControl(''),
    city: new FormControl(''),
    phoneNumber: new FormControl(''),
  })

  constructor() {
    this.userService.getProfile().subscribe((profile: User) => {
      const userData: User = {
        _id: profile._id,
        email: profile.email,
        name: profile.name,
        birthDay: profile.birthDay,
        role: profile.role,
        city: profile.city,
        phoneNumber: profile.phoneNumber,
      }
      this.profileForm.setValue(userData)
      this.profileForm.controls['birthDay'].disable()
      this.profileForm.controls['role'].disable()
    })
  }

  saveChanges() {
    this.userService
      .updateProfile(this.profileForm.value as User)
      .subscribe((updatedProfile) => {
        console.log(updatedProfile)
      })
  }

  deleteAccount() {
    const dialogRef = this.dialog.open(
      DeleteProfileConfirmationDialogComponent,
      {
        data: {},
      },
    )

    dialogRef
      .afterClosed()
      .pipe(filter((res) => res))
      .pipe(switchMap(() => this.userService.deleteAccount()))
      .subscribe(() => {
        this.userService.logOut()
        this.router.navigateByUrl('')
      })
  }
}
