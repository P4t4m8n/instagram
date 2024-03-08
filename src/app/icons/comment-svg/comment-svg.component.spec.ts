import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentSvgComponent } from './comment-svg.component';

describe('CommentSvgComponent', () => {
  let component: CommentSvgComponent;
  let fixture: ComponentFixture<CommentSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
