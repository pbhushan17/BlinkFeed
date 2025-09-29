import { Injectable } from '@angular/core';
import { NewsService } from './news-service';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { NewsItem } from '../models/news-item.model';
import { APP_CONSTANTS, StoryType } from '../../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class NewsStoreService {
  private newsItemsSubject = new BehaviorSubject<NewsItem[]>([]);
  newsItems$ = this.newsItemsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private ids: number[] = []
  private readonly pageSize = APP_CONSTANTS.pageSize;
  currentPage:number = APP_CONSTANTS.intialPage;

  constructor(private newsService: NewsService) {}

  loadStories(storyType: StoryType, page: number) {
    this.newsItemsSubject.next([]);
    this.currentPage = page;

    this.newsService.getStoriesByType(storyType).subscribe(ids => {
      this.ids = ids;
      this.loadStoryPage(page);
    })
  }


  loadStoryPage(page: number) {
    const pageNumber = Number(page);

    if(pageNumber > this.totalPages){
      this.newsItemsSubject.next([]);
      return;
    }

    this.loadingSubject.next(true);
    this.currentPage = pageNumber;

    const start = (pageNumber - 1) * this.pageSize;
    const end = pageNumber * this.pageSize;
    const pageIds = this.ids.slice(start, end);

    forkJoin(pageIds.map(id => this.newsService.getItem(id))).subscribe(stories => {
      this.newsItemsSubject.next(stories);
      this.loadingSubject.next(false);
    });
  }

  get totalPages(): number {
    return Math.ceil(this.ids.length / this.pageSize);
  }
}
