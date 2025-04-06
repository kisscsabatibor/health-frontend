import { Component, inject } from '@angular/core'
import { User } from '../../services/user/user'
import { UserService } from '../../services/user/user.service'
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-doctors',
  imports: [MatCardModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss',
})
export class DoctorsComponent {
  doctors: User[] = []
  private userService = inject(UserService)

  ngOnInit() {
    this.userService.getDoctors().subscribe((doctors) => {
      this.doctors = doctors
    })
  }
}
