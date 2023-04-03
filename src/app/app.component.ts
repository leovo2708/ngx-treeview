import { Component } from '@angular/core';
import { I18n } from './i18n';

@Component({
  selector: 'ngx-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private i18n: I18n) {}

  set language(language: string) {
    this.i18n.language = language;
  }

  get language(): string {
    return this.i18n.language;
  }
}
