import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinePaymentsComponent } from './online-payments.component';

describe('OnlinePaymentsComponent', () => {
  let component: OnlinePaymentsComponent;
  let fixture: ComponentFixture<OnlinePaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlinePaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
