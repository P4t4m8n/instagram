import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { HomeComponent } from './pages/home/home.component';
import { ContentIndexComponent } from './pages/image-index/content-index.component';
import { AppFooterComponent } from './cmps/app-footer/app-footer.component';
import { ImageDetailsComponent } from './pages/image-details/image-details.component';
import { ImageEditComponent } from './pages/image-edit/image-edit.component';
import { AppNavComponent } from './cmps/app-nav/app-nav.component';
import { ContentList } from './cmps/content-list/content-list.component';
import { ContentPreview } from './cmps/content-preview/content-preview.component';
import { CommentPreviewComponent } from './cmps/comment-preview/comment-preview.component';
import { CommentListComponent } from './cmps/comment-list/comment-list.component';
import { CommentIndexComponent } from './cmps/comment-index/comment-index.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContentIndexComponent,
    AppFooterComponent,
    ImageDetailsComponent,
    ImageEditComponent,
    AppNavComponent,
    ContentList,
    ContentPreview,
    CommentPreviewComponent,
    CommentListComponent,
    CommentIndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
