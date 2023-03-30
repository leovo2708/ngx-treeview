import { TestBed } from '@angular/core/testing';

import { TerminologyTreeviewService } from './terminology-treeview.service';

describe('TerminologyTreeviewService', () => {
  let service: TerminologyTreeviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminologyTreeviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
