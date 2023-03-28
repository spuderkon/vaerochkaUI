import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFlightComponent } from './register-flight.component';

describe('RegisterFlightComponent', () => {
  let component: RegisterFlightComponent;
  let fixture: ComponentFixture<RegisterFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFlightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
