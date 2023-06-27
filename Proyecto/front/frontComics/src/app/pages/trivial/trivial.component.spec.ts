import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrivialComponent } from './trivial.component';

describe('TrivialComponent', () => {
  let component: TrivialComponent;
  let fixture: ComponentFixture<TrivialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrivialComponent]
    });
    fixture = TestBed.createComponent(TrivialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
