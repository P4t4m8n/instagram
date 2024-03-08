import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContentModel } from '../../models/content.model';

@Component({
  selector: 'content-preview',
  templateUrl: './content-preview.component.html',
  styleUrl: './content-preview.component.scss'
})
export class ContentPreview {

  @Input() content!: ContentModel
  @Output() remove = new EventEmitter()

  onRemoveContact() {
    this.remove.emit(this.content._id)
  }
}
