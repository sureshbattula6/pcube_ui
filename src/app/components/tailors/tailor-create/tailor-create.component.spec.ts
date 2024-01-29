import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorCreateComponent } from './tailor-create.component';

describe('TailorCreateComponent', () => {
  let component: TailorCreateComponent;
  let fixture: ComponentFixture<TailorCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TailorCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TailorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
