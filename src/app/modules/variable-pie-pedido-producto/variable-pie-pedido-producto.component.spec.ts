import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariablePiePedidoProductoComponent } from './variable-pie-pedido-producto.component';

describe('VariablePiePedidoProductoComponent', () => {
  let component: VariablePiePedidoProductoComponent;
  let fixture: ComponentFixture<VariablePiePedidoProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariablePiePedidoProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariablePiePedidoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
