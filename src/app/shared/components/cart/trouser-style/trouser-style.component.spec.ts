import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrouserStyleComponent } from './trouser-style.component';

describe('TrouserStyleComponent', () => {
  let component: TrouserStyleComponent;
  let fixture: ComponentFixture<TrouserStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrouserStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrouserStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
