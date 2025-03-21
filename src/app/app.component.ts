import { Component, inject } from '@angular/core'
import { MatIconButton } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatToolbar } from '@angular/material/toolbar'
import { Router, RouterLink, RouterOutlet } from '@angular/router'
import { UserService } from '../services/user/user.service'

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbar,
    MatListModule,
    MatIconModule,
    MatIconButton,
    MatMenuModule,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected userService = inject(UserService)
  private router = inject(Router)
  title = 'Health'

  protected logOut() {
    this.userService.logOut()
    this.router.navigateByUrl('')
  }
}
