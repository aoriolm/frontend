import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedicurasComponent } from './pedicuras.component';

describe('PedicurasComponent', () => {
  let component: PedicurasComponent;
  let fixture: ComponentFixture<PedicurasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedicurasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedicurasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
