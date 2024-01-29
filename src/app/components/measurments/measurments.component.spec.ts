import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurmentsComponent } from './measurments.component';

describe('MeasurmentsComponent', () => {
  let component: MeasurmentsComponent;
  let fixture: ComponentFixture<MeasurmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
