import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquillajesComponent } from './maquillajes.component';

describe('MaquillajesComponent', () => {
  let component: MaquillajesComponent;
  let fixture: ComponentFixture<MaquillajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaquillajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaquillajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
