import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCajaComponent } from './dialog-caja.component';

describe('DialogCajaComponent', () => {
  let component: DialogCajaComponent;
  let fixture: ComponentFixture<DialogCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
