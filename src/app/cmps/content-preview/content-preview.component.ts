import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContentModel } from '../../models/content.model';

@Component({
  selector: 'content-preview',
  templateUrl: './content-preview.component.html',
  styleUrl: './content-preview.component.scss'
})
export class ContentPreview implements OnInit {

  @Input() content!: ContentModel
  @Output() remove = new EventEmitter()

  ngOnInit(): void {
      console.log(this.content)
  }

  onRemoveContact() {
    this.remove.emit(this.content._id)
  }
}
