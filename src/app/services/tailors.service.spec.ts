import { TestBed } from '@angular/core/testing';

import { TailorsService } from './tailors.service';

describe('TailorsService', () => {
  let service: TailorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TailorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
