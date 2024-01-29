import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorOrderViewComponent } from './tailor-order-view.component';

describe('TailorOrderViewComponent', () => {
  let component: TailorOrderViewComponent;
  let fixture: ComponentFixture<TailorOrderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TailorOrderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TailorOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
