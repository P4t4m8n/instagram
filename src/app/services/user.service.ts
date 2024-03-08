import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  demoUserOne: UserModel = {
    _id: 'u101',
    userName: 'Bobo',
    content: ['zv9xfmxysp', 'lluzsbzbizl', 'nh3p2c92h4s'],
    following: ['u102'],
    likes: ['7o6hayoj9ta']

  }
  demoUserTwo: UserModel = {
    _id: 'u102',
    userName: 'Vovo',
    content: ['7o6hayoj9ta', 'ankzldcr1as', '600zdvs2p7h'],
    following: [],
    likes: []

  }

  private _loggedInUser$ = new BehaviorSubject(this.demoUserOne)
  public loggedInUser$ = this._loggedInUser$.asObservable()

  getLoggedInUser() {
    return this._loggedInUser$.value
  }
}
