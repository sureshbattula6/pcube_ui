import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSalesemployeeComponent } from './report-salesemployee.component';

describe('ReportSalesemployeeComponent', () => {
  let component: ReportSalesemployeeComponent;
  let fixture: ComponentFixture<ReportSalesemployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSalesemployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSalesemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
