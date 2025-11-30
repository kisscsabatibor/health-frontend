import { Component, inject } from '@angular/core'
import { ThemeService } from '../../services/theme/theme.service'
import { MatIcon } from '@angular/material/icon'
import { MatIconButton } from '@angular/material/button'

@Component({
  selector: 'app-theme-toggle',
  imports: [MatIcon, MatIconButton],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent {
  isDarkMode: boolean
  private themeService = inject(ThemeService)

  constructor() {
    this.isDarkMode = this.themeService.isDarkMode()
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode
    this.themeService.setDarkMode(this.isDarkMode)
  }
}
