import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminologyTreeviewComponent } from './terminology-treeview.component';

describe('TerminologyTreeviewComponent', () => {
  let component: TerminologyTreeviewComponent;
  let fixture: ComponentFixture<TerminologyTreeviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminologyTreeviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TerminologyTreeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
