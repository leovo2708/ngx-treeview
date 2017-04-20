import { NgxTreeviewPage } from './app.po';

describe('ngx-treeview App', () => {
  let page: NgxTreeviewPage;

  beforeEach(() => {
    page = new NgxTreeviewPage();
  });

  it('should display message saying "Angular ngx-treeview component demo"', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Angular ngx-treeview component demo');
  });
});
