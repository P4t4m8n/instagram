import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentIndexComponent } from './comment-index.component';

describe('CommentIndexComponent', () => {
  let component: CommentIndexComponent;
  let fixture: ComponentFixture<CommentIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
