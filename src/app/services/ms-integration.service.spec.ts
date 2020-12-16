import { TestBed } from '@angular/core/testing';

import { MsIntegrationService } from './ms-integration.service';

describe('MsIntegrationService', () => {
  let service: MsIntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsIntegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
