import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNegocioComponent } from './dialog-negocio.component';

describe('DialogNegocioComponent', () => {
  let component: DialogNegocioComponent;
  let fixture: ComponentFixture<DialogNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNegocioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
