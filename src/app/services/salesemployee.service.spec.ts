import { TestBed } from '@angular/core/testing';

import { SalesemployeeService } from './salesemployee.service';

describe('SalesemployeeService', () => {
  let service: SalesemployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesemployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
