import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoremanagersComponent } from './storemanagers.component';

describe('StoremanagersComponent', () => {
  let component: StoremanagersComponent;
  let fixture: ComponentFixture<StoremanagersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoremanagersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoremanagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
