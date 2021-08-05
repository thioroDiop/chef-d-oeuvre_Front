import { TestBed } from '@angular/core/testing';

import { Guest.Service.TsService } from './guest.service.ts.service';

describe('Guest.Service.TsService', () => {
  let service: Guest.Service.TsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Guest.Service.TsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
