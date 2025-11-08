import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LanguageSelectorComponent } from './language-selector.component'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

describe('LanguageSelectorComponent', () => {
  let component: LanguageSelectorComponent
  let fixture: ComponentFixture<LanguageSelectorComponent>
  let translateService: TranslateService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSelectorComponent, TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(LanguageSelectorComponent)
    component = fixture.componentInstance
    translateService = TestBed.inject(TranslateService)

    spyOn(translateService, 'use').and.callThrough()
    spyOn(localStorage, 'setItem').and.callFake(() => {})
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should change language correctly', () => {
    component.changeLanguage('es')

    expect(component.selectedLang).toBe('es')
    expect(document.documentElement.lang).toBe('es')
    expect(translateService.use).toHaveBeenCalledWith('es')
    expect(localStorage.setItem).toHaveBeenCalledWith('lang', 'es')
  })

  it('should handle an empty languages input array', () => {
    component.languages = []
    fixture.detectChanges()

    expect(component.languages.length).toBe(0)
  })

  it('should handle a non-empty languages input array', () => {
    component.languages = ['en', 'fr', 'es']
    fixture.detectChanges()

    expect(component.languages).toEqual(['en', 'fr', 'es'])
  })
})
