import { browser, element, by } from 'protractor';

export class NgxTreeviewPage {
  navigateTo() {
    return browser.get('/');
  }

  getBrandText() {
    return element(by.css('ngx-app .navbar-brand')).getText();
  }
}
