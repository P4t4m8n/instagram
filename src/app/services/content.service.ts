import { Injectable } from '@angular/core'
import { BehaviorSubject, from, Observable, throwError } from 'rxjs'
import { catchError, retry, tap } from 'rxjs/operators'
import { storageService } from './async-storage.service'
import { ContentModel } from '../models/content.model'

const ENTITY = 'content'

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor() {

    const content = JSON.parse(localStorage.getItem(ENTITY) || 'null')
    if (!content || content.length === 0) {
      localStorage.setItem(ENTITY, JSON.stringify(this._createContent()))
    }
  }

  private _content$ = new BehaviorSubject<ContentModel[]>([])
  public content$ = this._content$.asObservable()

  // private _filterBy$ = new BehaviorSubject<ContentModelFilter>({ term: '' })
  // public filterBy$ = this._filterBy$.asObservable()


  public query() {
    return from(storageService.query<ContentModel>(ENTITY))
      .pipe(
        tap(content => {
          // console.log('content in tap:', content)
          // const filterBy = this._filterBy$.value
          // content = content.filter(ContentModel => ContentModel.name.toLowerCase().includes(filterBy.term.toLowerCase()))
          this._content$.next(content)
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  public getEmptyContentModel(): Partial<ContentModel> {
    return {
      imgUrl: '',
      likes: 0,
      comments: [],
      following: []
    }
  }

  public remove(ContentModelId: string) {
    return from(storageService.remove(ENTITY, ContentModelId))
      .pipe(
        tap(() => {
          const content = this._content$.value
          const ContentModelIdx = content.findIndex(ContentModel => ContentModel._id === ContentModelId)
          content.splice(ContentModelIdx, 1)
          this._content$.next([...content])
          return ContentModelId
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  // public setFilter(filterBy: ContentModelFilter) {
  //   this._filterBy$.next(filterBy)
  //   this.query().subscribe()
  // }

  public getById(ContentModelId: string): Observable<ContentModel> {
    return from(storageService.get<ContentModel>(ENTITY, ContentModelId))
      .pipe(
        retry(1),
        catchError(this._handleError)
      )

  }

  public save(ContentModel: ContentModel) {
    return ContentModel._id ? this._edit(ContentModel) : this.#add(ContentModel)
  }

  #add(ContentModel: ContentModel) {
    return from(storageService.post(ENTITY, ContentModel))
      .pipe(
        tap(newContentModel => {
          const content = this._content$.value
          content.push(newContentModel)
          this._content$.next([...content])
          return newContentModel
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  private _edit(ContentModel: ContentModel) {
    return from(storageService.put(ENTITY, ContentModel))
      .pipe(
        tap(updatedContentModel => {
          const content = this._content$.value
          const ContentModelIdx = content.findIndex(_ContentModel => _ContentModel._id === ContentModel._id)
          content[ContentModelIdx] = updatedContentModel
          // content.splice(ContentModelIdx, 1, updatedContentModel)
          this._content$.next([...content])
          return updatedContentModel
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  private _createContent() {
    const contents: ContentModel[] = [
      {
        _id: "1",
        imgUrl: `https://robohash.org/${this._makeId()}.png`,
        likes: 120,
        comments: [
          {
            _id: "c1",
            name: "Alice",
            comment: "Great photo!",
            likes: 15,
            createdAt: new Date("2024-03-01T10:00:00"),
            comments: []
          },
          {
            _id: "c2",
            name: "Bob",
            comment: "Love this!",
            likes: 10,
            createdAt: new Date("2024-03-02T12:30:00"),
            comments: [
              {
                _id: "c2-1",
                name: "Carol",
                comment: "Totally agree!",
                likes: 5,
                createdAt: new Date("2024-03-02T13:00:00"),
                comments: []
              }
            ]
          }
        ],
        following: ["user2", "user3"]
      },
      {
        _id: "2",
        imgUrl: `https://robohash.org/${this._makeId()}.png`,
        likes: 250,
        comments: [
          {
            _id: "c3",
            name: "Dave",
            comment: "Amazing scenery!",
            likes: 20,
            createdAt: new Date("2024-03-03T15:45:00"),
            comments: []
          }
        ],
        following: ["user1", "user4", "user5"]
      },
      {
        _id: "3",
        imgUrl: `https://robohash.org/${this._makeId()}.png`,
        likes: 180,
        comments: [
          {
            _id: "c4",
            name: "Eve",
            comment: "Where was this taken?",
            likes: 8,
            createdAt: new Date("2024-03-04T09:20:00"),
            comments: []
          },
          {
            _id: "c5",
            name: "Frank",
            comment: "Stunning view!",
            likes: 12,
            createdAt: new Date("2024-03-05T11:10:00"),
            comments: []
          }
        ],
        following: ["user2", "user6"]
      }]
    return contents
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
