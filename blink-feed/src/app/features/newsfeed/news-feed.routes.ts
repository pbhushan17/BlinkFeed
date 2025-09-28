import { Routes } from '@angular/router';
import { NewsFeedComponent } from './containers/newsfeed/news-feed.component';

export const NEWS_FEED_ROUTES: Routes = [
  {
    path: '',
    component: NewsFeedComponent
  }
];
