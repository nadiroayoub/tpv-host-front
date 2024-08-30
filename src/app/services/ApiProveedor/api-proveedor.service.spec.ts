import { TestBed } from '@angular/core/testing';

import { ApiProveedorService } from './api-proveedor.service';

describe('ApiProveedorService', () => {
  let service: ApiProveedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiProveedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
