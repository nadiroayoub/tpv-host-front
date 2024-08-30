import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPlatoComponent } from './dialog-plato.component';

describe('DialogPlatoComponent', () => {
  let component: DialogPlatoComponent;
  let fixture: ComponentFixture<DialogPlatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPlatoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPlatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
