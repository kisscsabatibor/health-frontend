import { Component, inject, Input, DOCUMENT } from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-language-selector',
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
})
export class LanguageSelectorComponent {
  @Input() languages: string[] = []
  selectedLang = ''
  private document = inject(DOCUMENT)
  private translate = inject(TranslateService)

  constructor() {
    this.changeLanguage(localStorage.getItem('lang') || 'en')
  }

  changeLanguage(lang: string): void {
    this.document.documentElement.lang = lang
    this.translate.use(lang)
    this.selectedLang = lang
    localStorage.setItem('lang', lang)
  }
}
