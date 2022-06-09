import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacialesComponent } from './faciales.component';

describe('FacialesComponent', () => {
  let component: FacialesComponent;
  let fixture: ComponentFixture<FacialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
