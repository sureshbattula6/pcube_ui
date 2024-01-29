import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraMeasurementComponent } from './camera-measurement.component';

describe('CameraMeasurementComponent', () => {
  let component: CameraMeasurementComponent;
  let fixture: ComponentFixture<CameraMeasurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraMeasurementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
