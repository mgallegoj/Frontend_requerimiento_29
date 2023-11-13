import { TestBed } from '@angular/core/testing';

import { OwnerConsultService } from './owner-consult.service';

describe('OwnerConsultService', () => {
  let service: OwnerConsultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerConsultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
