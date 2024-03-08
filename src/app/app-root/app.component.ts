import { Component, OnInit, inject } from '@angular/core';
import { ContentService } from '../services/content.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  contentService = inject(ContentService)

  ngOnInit(): void {
    this.contentService.query()
      .pipe(take(1))
      .subscribe({
        error: (error) => console.log('error:', error)
      })
  }
}
