import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContentModel } from '../../models/content.model';

@Component({
  selector: 'content-list',
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.scss'
})
export class ContentList {

  @Input() content: ContentModel[] | null = null
  @Output() remove = new EventEmitter()

  trackByFn(idx: number, item: any) {
    return item._id
  }
}
