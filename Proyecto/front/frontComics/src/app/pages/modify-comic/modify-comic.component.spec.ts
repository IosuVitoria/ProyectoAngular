import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyComicComponent } from './modify-comic.component';

describe('ModifyComicComponent', () => {
  let component: ModifyComicComponent;
  let fixture: ComponentFixture<ModifyComicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyComicComponent]
    });
    fixture = TestBed.createComponent(ModifyComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
