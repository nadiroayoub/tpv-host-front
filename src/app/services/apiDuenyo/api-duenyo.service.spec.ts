import { TestBed } from '@angular/core/testing';

import { ApiDuenyoService } from './api-duenyo.service';

describe('ApiDuenyoService', () => {
  let service: ApiDuenyoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDuenyoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
