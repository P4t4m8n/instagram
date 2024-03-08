import { Component, inject } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { Observable, take } from 'rxjs';
import { ContentModel } from '../../models/content.model';

@Component({
  selector: 'content-index',
  templateUrl: './content-index.component.html',
  styleUrl: './content-index.component.scss'
})
export class ContentIndexComponent {

  contentService = inject(ContentService)

  content$: Observable<ContentModel[]> = this.contentService.content$

  onRemoveContent(contentId: string) {
    this.contentService.remove(contentId)
      .pipe(take(1))
      .subscribe({
        error: err => console.log('err:', err),
      })
  }

}
