import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesEmployeeCreateComponent } from './sales-employee-create.component';

describe('SalesEmployeeCreateComponent', () => {
  let component: SalesEmployeeCreateComponent;
  let fixture: ComponentFixture<SalesEmployeeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesEmployeeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesEmployeeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
