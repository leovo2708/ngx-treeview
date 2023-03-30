import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminologyTreeTestComponent } from './terminology-tree-test.component';

describe('TerminologyTreeTestComponent', () => {
  let component: TerminologyTreeTestComponent;
  let fixture: ComponentFixture<TerminologyTreeTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminologyTreeTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminologyTreeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
