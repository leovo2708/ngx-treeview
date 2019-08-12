import { NgxTreeviewPage } from './app.po';

describe('ngx-treeview App', () => {
  let page: NgxTreeviewPage;

  beforeEach(() => {
    page = new NgxTreeviewPage();
  });

  it('should display brand message saying "ngx-treeview"', () => {
    page.navigateTo();
    expect(page.getBrandText()).toEqual('ngx-treeview');
  });
});
