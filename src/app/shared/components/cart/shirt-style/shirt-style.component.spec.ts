import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShirtStyleComponent } from './shirt-style.component';

describe('ShirtStyleComponent', () => {
  let component: ShirtStyleComponent;
  let fixture: ComponentFixture<ShirtStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShirtStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShirtStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
