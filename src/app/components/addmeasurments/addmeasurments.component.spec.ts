import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmeasurmentsComponent } from './addmeasurments.component';

describe('AddmeasurmentsComponent', () => {
  let component: AddmeasurmentsComponent;
  let fixture: ComponentFixture<AddmeasurmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmeasurmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmeasurmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
