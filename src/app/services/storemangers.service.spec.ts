import { TestBed } from '@angular/core/testing';

import { StoremangersService } from './storemangers.service';

describe('StoremangersService', () => {
  let service: StoremangersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoremangersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
