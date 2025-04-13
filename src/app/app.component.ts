import { Component, inject } from '@angular/core'
import { MatIconButton } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatToolbar } from '@angular/material/toolbar'
import { Router, RouterLink, RouterOutlet } from '@angular/router'
import { UserService } from '../services/user/user.service'
import { AuthService } from '../services/auth/auth.service'
import { RequestService } from '../services/request/request.service'
import { map } from 'rxjs'
import { AsyncPipe } from '@angular/common'
import { ThemeToggleComponent } from '../components/theme-toggle/theme-toggle.component'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import { LanguageSelectorComponent } from '../components/language-selector/language-selector.component'

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
    AsyncPipe,
    ThemeToggleComponent,
    TranslatePipe,
    LanguageSelectorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected userService = inject(UserService)
  protected authService = inject(AuthService)
  private router = inject(Router)
  private requestService = inject(RequestService)
  private translateService = inject(TranslateService)
  langs = ['en', 'de', 'hu']

  constructor() {
    this.translateService.addLangs(this.langs)
    this.translateService.setDefaultLang(this.langs[0])
    this.translateService.use(this.langs[0])
  }

  protected incomingRequests$ = this.requestService
    .getAllRequests()
    .pipe(map((requests) => requests.length))

  title = 'Health'

  protected logOut() {
    this.userService.logOut()
    this.router.navigateByUrl('')
  }

  protected fetchRequests() {
    this.incomingRequests$ = this.requestService
      .getAllRequests()
      .pipe(map((requests) => requests.length))
  }
}
