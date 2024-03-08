import { Component, OnInit, inject } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  contentService = inject(ContentService)
  userService = inject(UserService)

  user$: Observable<UserModel> = this.userService.loggedInUser$
  ngOnInit(): void {
    this.user$.subscribe()
   

  }



}
