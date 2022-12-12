import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProveedorComponent } from './dialog-proveedor.component';

describe('DialogProveedorComponent', () => {
  let component: DialogProveedorComponent;
  let fixture: ComponentFixture<DialogProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProveedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
