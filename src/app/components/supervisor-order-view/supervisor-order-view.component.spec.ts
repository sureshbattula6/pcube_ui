import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorOrderViewComponent } from './supervisor-order-view.component';

describe('SupervisorOrderViewComponent', () => {
  let component: SupervisorOrderViewComponent;
  let fixture: ComponentFixture<SupervisorOrderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisorOrderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
