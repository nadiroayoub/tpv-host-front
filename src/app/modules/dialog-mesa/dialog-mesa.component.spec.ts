import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMesaComponent } from './dialog-mesa.component';

describe('DialogMesaComponent', () => {
  let component: DialogMesaComponent;
  let fixture: ComponentFixture<DialogMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
