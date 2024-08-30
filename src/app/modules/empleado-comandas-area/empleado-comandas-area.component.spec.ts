import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoComandasAreaComponent } from './empleado-comandas-area.component';

describe('EmpleadoComandasAreaComponent', () => {
  let component: EmpleadoComandasAreaComponent;
  let fixture: ComponentFixture<EmpleadoComandasAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoComandasAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoComandasAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
