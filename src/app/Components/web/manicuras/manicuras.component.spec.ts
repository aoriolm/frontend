import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManicurasComponent } from './manicuras.component';

describe('ManicurasComponent', () => {
  let component: ManicurasComponent;
  let fixture: ComponentFixture<ManicurasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManicurasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManicurasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
