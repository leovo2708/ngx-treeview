import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminologyTreeViewItemComponent } from './terminology-tree-view-item.component';

describe('TerminologyTreeViewItemComponent', () => {
  let component: TerminologyTreeViewItemComponent;
  let fixture: ComponentFixture<TerminologyTreeViewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminologyTreeViewItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminologyTreeViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
