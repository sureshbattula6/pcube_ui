import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatemeasurementComponent } from './updatemeasurement.component';

describe('UpdatemeasurementComponent', () => {
  let component: UpdatemeasurementComponent;
  let fixture: ComponentFixture<UpdatemeasurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatemeasurementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatemeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
