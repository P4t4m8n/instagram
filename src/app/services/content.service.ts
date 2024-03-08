import { Injectable } from '@angular/core'
import { BehaviorSubject, from, Observable, throwError } from 'rxjs'
import { catchError, retry, tap } from 'rxjs/operators'
import { storageService } from './async-storage.service'
import { ContentModel } from '../models/content.model'
import { createRandomContentModel } from './demoDataGen'

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

  public getEmptyContent(): Partial<ContentModel> {
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
    return ContentModel._id ? this.#edit(ContentModel) : this.#add(ContentModel)
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

  #edit(ContentModel: ContentModel) {
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
    const contents: ContentModel[] = []

    for (var i = 0; i < 20; i++) {
      contents.push(createRandomContentModel())
    }
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
