import { browser, element, by } from 'protractor';

export class NgxTreeviewPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ngx-app h2')).getText();
  }
}
