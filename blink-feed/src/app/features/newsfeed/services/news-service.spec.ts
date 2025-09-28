import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NewsService } from './news-service';
import { API_CONSTANTS } from '../../../app.constants';
import { NewsItem } from '../models/news-item.model';
import { provideHttpClient } from '@angular/common/http';

describe('NewsService', () => {
  let service: NewsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NewsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });

    service = TestBed.inject(NewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call API and fetch a NewsItem', () => {
    const mockItem: NewsItem = {
      id: 1,
      title: 'Test',
      type: 'story',
      by: 'author',
      time: 123456,
      url: 'http://example.com',
      score: 10,
      descendants: 5,
      kids: []
    };

    service.getItem(1).subscribe(item => {
      expect(item).toEqual(mockItem);
    });

    const req = httpMock.expectOne(`${API_CONSTANTS.HACKER_NEWS_API}/item/1.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockItem);
  });

  it('should call API and fetch story IDs by type', () => {
    const mockIds = [1, 2, 3];

    service.getStoriesByType('topstories').subscribe(ids => {
      expect(ids).toEqual(mockIds);
    });

    const req = httpMock.expectOne(`${API_CONSTANTS.HACKER_NEWS_API}/topstories.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockIds);
  });
});
