import { Component, OnInit, inject } from '@angular/core';
import { ContentService } from '../services/content.service';
import { Observable, take } from 'rxjs';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  contentService = inject(ContentService)
  userService = inject(UserService)

  user$: Observable<UserModel> = this.userService.loggedInUser$

  ngOnInit(): void {
    this.contentService.query()
      .pipe(take(1))
      .subscribe({
        error: (error) => console.log('error:', error)
      })
  }
}
