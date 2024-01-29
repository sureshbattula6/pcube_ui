import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitStyleComponent } from './suit-style.component';

describe('SuitStyleComponent', () => {
  let component: SuitStyleComponent;
  let fixture: ComponentFixture<SuitStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
