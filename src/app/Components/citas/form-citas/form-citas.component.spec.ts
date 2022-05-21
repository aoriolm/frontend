import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCitasComponent } from './form-citas.component';

describe('FormCitasComponent', () => {
  let component: FormCitasComponent;
  let fixture: ComponentFixture<FormCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
