import { TestBed } from '@angular/core/testing';
import { NewsStoreService } from './news-store.service';
import { NewsService } from './news-service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { NewsItem } from '../models/news-item.model';

describe('NewsStoreService', () => {
  let service: NewsStoreService;
  let newsService: jest.Mocked<NewsService>;
  let httpMock: HttpTestingController;

  const mockStories : NewsItem[] = [
    { id: 1, title: 'Story 1', type: 'story', by: 'author1', time: 123, url: 'https://teststory1.com', score: 10, descendants: 5, kids: [] },
    { id: 2, title: 'Story 2', type: 'story', by: 'author2', time: 456, url: 'https://teststory2.com', score: 20, descendants: 4, kids: [] }
  ];

  beforeEach(() => {

    const newsServiceMock = {
      getStoriesByType: jest.fn(),
      getItem: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        NewsStoreService,
        { provide: NewsService, useValue: newsServiceMock },
          provideHttpClient(),
          provideHttpClientTesting(),
      ]
    });

    service = TestBed.inject(NewsStoreService);
    newsService = TestBed.inject(NewsService) as jest.Mocked<NewsService>;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load stories when loadStories is called', (done) => {
    newsService.getStoriesByType.mockReturnValue(of([1, 2]));
    newsService.getItem.mockReturnValueOnce(of(mockStories[0]));
    newsService.getItem.mockReturnValueOnce(of(mockStories[1]));

    service.loadStories('topstories', 1);

    service.newsItems$.subscribe(items => {
      if (items.length > 0) {
        expect(items).toEqual(mockStories);
        done();
      }
    });
  });

  it('should clear stories if page is greater than totalPages', (done) => {
    (service as any).ids = [1];

    service.loadStoryPage(99);

    service.newsItems$.subscribe(items => {
      expect(items).toEqual([]);
      done();
    });
  });
});
