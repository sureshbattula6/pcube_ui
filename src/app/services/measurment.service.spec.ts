import { TestBed } from '@angular/core/testing';

import { MeasurmentService } from './measurment.service';

describe('MeasurmentService', () => {
  let service: MeasurmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeasurmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
