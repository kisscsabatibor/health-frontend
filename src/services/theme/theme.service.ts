import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = false

  constructor() {
    this.setDarkMode(localStorage.getItem('theme') === 'dark')
  }

  isDarkMode() {
    return this.darkMode
  }

  setDarkMode(isDarkMode: boolean) {
    this.darkMode = isDarkMode
    if (isDarkMode) {
      localStorage.setItem('theme', 'dark')
      document.body.classList.add('dark-theme')
    } else {
      localStorage.setItem('theme', 'light')
      document.body.classList.remove('dark-theme')
    }
  }
}
