import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsItem } from '../models/news-item.model';
import { API_CONSTANTS, StoryType } from '../../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

 constructor(public http: HttpClient) {}

  getItem(id: number) : Observable<NewsItem> {
    return this.http.get<NewsItem>(`${API_CONSTANTS.HACKER_NEWS_API}/item/${id}.json`);
  }

  getStoriesByType(type: StoryType): Observable<number[]> {
    return this.http.get<number[]>(`${API_CONSTANTS.HACKER_NEWS_API}/${type}.json`);
  }
}
