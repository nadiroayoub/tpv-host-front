import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariablePiePedidoMenuComponent } from './variable-pie-pedido-menu.component';

describe('VariablePiePedidoMenuComponent', () => {
  let component: VariablePiePedidoMenuComponent;
  let fixture: ComponentFixture<VariablePiePedidoMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariablePiePedidoMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariablePiePedidoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
