import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementStyleComponent } from './measurement-style.component';

describe('MeasurementStyleComponent', () => {
  let component: MeasurementStyleComponent;
  let fixture: ComponentFixture<MeasurementStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
