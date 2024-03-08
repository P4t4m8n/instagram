import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSvgComponent } from './image-svg.component';

describe('ImageSvgComponent', () => {
  let component: ImageSvgComponent;
  let fixture: ComponentFixture<ImageSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
