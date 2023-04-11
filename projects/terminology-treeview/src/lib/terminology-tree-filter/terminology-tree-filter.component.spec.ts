import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminologyTreeFilterComponent } from './terminology-tree-filter.component';

describe('NewTerminologyTreeFilterComponent', () => {
  let component: TerminologyTreeFilterComponent;
  let fixture: ComponentFixture<TerminologyTreeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminologyTreeFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TerminologyTreeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
