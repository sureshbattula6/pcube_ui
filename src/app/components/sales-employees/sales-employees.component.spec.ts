import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesEmployeesComponent } from './sales-employees.component';

describe('SalesEmployeesComponent', () => {
  let component: SalesEmployeesComponent;
  let fixture: ComponentFixture<SalesEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
