import { TestBed } from '@angular/core/testing';

import { ApiCajaService } from './api-caja.service';

describe('ApiCajaService', () => {
  let service: ApiCajaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCajaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
