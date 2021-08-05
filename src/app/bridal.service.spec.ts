import { TestBed } from '@angular/core/testing';

import { BridalService } from './bridal.service';

describe('BridalService', () => {
  let service: BridalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BridalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
