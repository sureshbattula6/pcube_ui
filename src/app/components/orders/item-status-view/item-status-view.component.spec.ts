import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemStatusViewComponent } from './item-status-view.component';

describe('ItemStatusViewComponent', () => {
  let component: ItemStatusViewComponent;
  let fixture: ComponentFixture<ItemStatusViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemStatusViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemStatusViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
