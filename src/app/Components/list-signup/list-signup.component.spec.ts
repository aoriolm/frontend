import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSignupComponent } from './list-signup.component';

describe('ListSignupComponent', () => {
  let component: ListSignupComponent;
  let fixture: ComponentFixture<ListSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
