import { Component } from '@angular/core'
import { MatIconButton } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatToolbar } from '@angular/material/toolbar'
import { RouterLink, RouterOutlet } from '@angular/router'

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
  title = 'health-frontend'
}
