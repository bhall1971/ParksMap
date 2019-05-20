import { TestBed } from '@angular/core/testing';

import { ProxyserviceService } from './proxyservice.service';

describe('ProxyserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProxyserviceService = TestBed.get(ProxyserviceService);
    expect(service).toBeTruthy();
  });
});
