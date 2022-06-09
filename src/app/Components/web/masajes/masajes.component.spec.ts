import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasajesComponent } from './masajes.component';

describe('MasajesComponent', () => {
  let component: MasajesComponent;
  let fixture: ComponentFixture<MasajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
