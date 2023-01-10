import { TestBed } from '@angular/core/testing';

import { ApiLineaComandaService } from './api-linea-comanda.service';

describe('ApiLineaComandaService', () => {
  let service: ApiLineaComandaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiLineaComandaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
