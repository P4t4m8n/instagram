import { Injectable } from '@angular/core'
import { BehaviorSubject, from, Observable, throwError } from 'rxjs'
import { catchError, retry, tap } from 'rxjs/operators'
import { storageService } from './async-storage.service'
import { CommentByModel, CommentModel } from '../models/comment.model'

const ENTITY = 'comment'

@Injectable({
  providedIn: 'root'
})
export class commentService {

  constructor() {

    const comment = JSON.parse(localStorage.getItem(ENTITY) || 'null')
    if (!comment || comment.length === 0) {
      localStorage.setItem(ENTITY, JSON.stringify(this.#createComment()))
    }
  }

  private _comment$ = new BehaviorSubject<CommentModel[]>([])
  public comment$ = this._comment$.asObservable()

  // private _filterBy$ = new BehaviorSubject<commentModelFilter>({ term: '' })
  // public filterBy$ = this._filterBy$.asObservable()


  public query() {
    return from(storageService.query<CommentModel>(ENTITY))
      .pipe(
        tap(comment => {
          // console.log('comment in tap:', comment)
          // const filterBy = this._filterBy$.value
          // comment = comment.filter(commentModel => commentModel.name.toLowerCase().includes(filterBy.term.toLowerCase()))
          this._comment$.next(comment)
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  public getEmptyComment(commentBy: CommentByModel): Partial<CommentModel> {
    return {
      commentBy: commentBy,
      imgUrl: '',
      likes: 0,
      comments: [],
      comment: '',
    }
  }

  public remove(commentModelId: string) {
    return from(storageService.remove(ENTITY, commentModelId))
      .pipe(
        tap(() => {
          const comment = this._comment$.value
          const commentModelIdx = comment.findIndex(commentModel => commentModel._id === commentModelId)
          comment.splice(commentModelIdx, 1)
          this._comment$.next([...comment])
          return commentModelId
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  // public setFilter(filterBy: commentModelFilter) {
  //   this._filterBy$.next(filterBy)
  //   this.query().subscribe()
  // }

  public getById(commentModelId: string): Observable<CommentModel> {
    return from(storageService.get<CommentModel>(ENTITY, commentModelId))
      .pipe(
        retry(1),
        catchError(this._handleError)
      )

  }

  public save(commentModel: CommentModel) {
    return commentModel._id ? this.#edit(commentModel) : this.#add(commentModel)
  }

  #add(commentModel: CommentModel) {
    return from(storageService.post(ENTITY, commentModel))
      .pipe(
        tap(newCommentModel => {
          const comment = this._comment$.value
          comment.push(newCommentModel)
          this._comment$.next([...comment])
          return newCommentModel
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  #edit(commentModel: CommentModel) {
    return from(storageService.put(ENTITY, commentModel))
      .pipe(
        tap(updatedCommentModel => {
          const comment = this._comment$.value
          const commentModelIdx = comment.findIndex(_commentModel => _commentModel._id === commentModel._id)
          comment[commentModelIdx] = updatedCommentModel
          this._comment$.next([...comment])
          return updatedCommentModel
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  #createComment() {
    // Hardcoded array of CommentModel objects

    const comments: CommentModel[] = [
      {
        imgUrl: "https://example.com/img1.jpg",
        _id: "1",
        commentBy: {
          _id: "user1",
          userName: "User One"
        },
        comment: "This is the first comment",
        likes: 10,
        createdAt: new Date('2024-01-01T12:00:00'),
        comments: []
      },
      {
        imgUrl: "https://example.com/img2.jpg",
        _id: "2",
        commentBy: {
          _id: "user2",
          userName: "User Two"
        },
        comment: "This is the second comment",
        likes: 20,
        createdAt: new Date('2024-01-02T13:00:00'),
        comments: []
      },
      {
        imgUrl: "https://example.com/img3.jpg",
        _id: "3",
        commentBy: {
          _id: "user3",
          userName: "User Three"
        },
        comment: "This is the third comment",
        likes: 5,
        createdAt: new Date('2024-01-03T14:00:00'),
        comments: []
      },
      {
        imgUrl: "https://example.com/img4.jpg",
        _id: "4",
        commentBy: {
          _id: "user4",
          userName: "User Four"
        },
        comment: "This is the fourth comment",
        likes: 8,
        createdAt: new Date('2024-01-04T15:00:00'),
        comments: []
      },
      {
        imgUrl: "https://example.com/img5.jpg",
        _id: "5",
        commentBy: {
          _id: "user5",
          userName: "User Five"
        },
        comment: "This is the fifth comment",
        likes: 15,
        createdAt: new Date('2024-01-05T16:00:00'),
        comments: []
      },
      {
        imgUrl: "https://example.com/img6.jpg",
        _id: "6",
        commentBy: {
          _id: "user6",
          userName: "User Six"
        },
        comment: "This is the sixth comment",
        likes: 25,
        createdAt: new Date('2024-01-06T17:00:00'),
        comments: []
      },
      {
        imgUrl: "https://example.com/img7.jpg",
        _id: "7",
        commentBy: {
          _id: "user7",
          userName: "User Seven"
        },
        comment: "This is the seventh comment",
        likes: 30,
        createdAt: new Date('2024-01-07T18:00:00'),
        comments: []
      },
      {
        imgUrl: "https://example.com/img8.jpg",
        _id: "8",
        commentBy: {
          _id: "user8",
          userName: "User Eight"
        },
        comment: "This is the eighth comment",
        likes: 12,
        createdAt: new Date('2024-01-08T19:00:00'),
        comments: []
      },
      {
        imgUrl: "https://example.com/img9.jpg",
        _id: "9",
        commentBy: {
          _id: "user9",
          userName: "User Nine"
        },
        comment: "This is the ninth comment",
        likes: 18,
        createdAt: new Date('2024-01-09T20:00:00'),
        comments: []
      },
      {
        imgUrl: "https://example.com/img10.jpg",
        _id: "10",
        commentBy: {
          _id: "user10",
          userName: "User Ten"
        },
        comment: "This is the tenth comment",
        likes: 50,
        createdAt: new Date('2024-01-10T21:00:00'),
        comments: []
      }
    ];

    return comments
  }

  private _handleError(err: any) {
    console.log('err:', err)
    return throwError(() => err)
  }

  private _makeId(length = 5) {
    var text = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }
}
