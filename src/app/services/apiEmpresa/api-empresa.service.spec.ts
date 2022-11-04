import { TestBed } from '@angular/core/testing';

import { ApiEmpresaService } from './api-empresa.service';

describe('ApiEmpresaService', () => {
  let service: ApiEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
