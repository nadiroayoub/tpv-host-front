import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFacturaComponent } from './dialog-factura.component';

describe('DialogFacturaComponent', () => {
  let component: DialogFacturaComponent;
  let fixture: ComponentFixture<DialogFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFacturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
