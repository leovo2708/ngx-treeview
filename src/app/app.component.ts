import { Component } from '@angular/core';
import { I18n } from './i18n';
import { UThemeService } from '@orbis-u/styles';

@Component({
  selector: 'ngx-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isDark = false;
  constructor(private i18n: I18n, private themeService: UThemeService) {}

  set language(language: string) {
    this.i18n.language = language;
  }

  get language(): string {
    return this.i18n.language;
  }

  onThemeToggleChange(event: boolean) {
    if (this.isDark) {
      this.themeService.switchTo({
        internalName: 'u-radiology',
        displayName: 'u-radiology',
      });
    } else {
      this.themeService.resetTheme();
    }
  }
}
