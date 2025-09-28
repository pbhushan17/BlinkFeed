import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'newsfeed',
    loadChildren: () => import('./features/newsfeed/news-feed.routes').then(m => m.NEWS_FEED_ROUTES)
  },
  {
    path: '',
    redirectTo: 'newsfeed',
    pathMatch: 'full'
  },
   {
    path: '**',
    redirectTo: '/newsfeed'
  }
];
