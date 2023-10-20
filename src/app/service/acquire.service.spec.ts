import { TestBed } from '@angular/core/testing';

import { AcquireService } from './acquire.service';

describe('AcquireService', () => {
  let service: AcquireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcquireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
