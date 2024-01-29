import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMeasurementsComponent } from './customer-measurements.component';

describe('CustomerMeasurementsComponent', () => {
  let component: CustomerMeasurementsComponent;
  let fixture: ComponentFixture<CustomerMeasurementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerMeasurementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
