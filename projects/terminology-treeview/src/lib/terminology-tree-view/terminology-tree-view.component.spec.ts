import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminologyTreeViewComponent } from './terminology-tree-view.component';

describe('TerminologyTreeViewComponent', () => {
  let component: TerminologyTreeViewComponent;
  let fixture: ComponentFixture<TerminologyTreeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminologyTreeViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminologyTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
