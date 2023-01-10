import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatosMenusComponent } from './platos-menus.component';

describe('PlatosMenusComponent', () => {
  let component: PlatosMenusComponent;
  let fixture: ComponentFixture<PlatosMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatosMenusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatosMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
