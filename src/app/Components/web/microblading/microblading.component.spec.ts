import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrobladingComponent } from './microblading.component';

describe('MicrobladingComponent', () => {
  let component: MicrobladingComponent;
  let fixture: ComponentFixture<MicrobladingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrobladingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrobladingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
