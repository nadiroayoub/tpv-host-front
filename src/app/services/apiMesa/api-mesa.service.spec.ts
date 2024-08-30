import { TestBed } from '@angular/core/testing';

import { ApiMesaService } from './api-mesa.service';

describe('ApiMesaService', () => {
  let service: ApiMesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMesaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
