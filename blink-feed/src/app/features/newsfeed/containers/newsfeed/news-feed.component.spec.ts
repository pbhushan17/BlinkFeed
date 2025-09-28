import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsFeedComponent } from './news-feed.component';
import { NewsStoreService } from '../../services/news-store.service';
import { APP_CONSTANTS, STORY_TYPES } from '../../../../app.constants';

class MockNewsStoreService {
  loadStories = jest.fn();
  loadPage = jest.fn();
}

describe('NewsFeedComponent', () => {
  let component: NewsFeedComponent;
  let newsStore: MockNewsStoreService;
  let router: { navigate: jest.Mock };

  beforeEach(async () => {
    router = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [NewsFeedComponent], // standalone component
      providers: [
        { provide: NewsStoreService, useClass: MockNewsStoreService },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ storyType: STORY_TYPES.TOP, page: 2 })
          }
        }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(NewsFeedComponent);
    component = fixture.componentInstance;
    newsStore = TestBed.inject(NewsStoreService) as unknown as MockNewsStoreService;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadStories when query params are read', () => {
    expect(newsStore.loadStories).toHaveBeenCalledWith(STORY_TYPES.TOP, 2);
  });

  it('loadPage() should call router.navigate with new page', () => {
    component.loadPage(3);

    expect(router.navigate).toHaveBeenCalledWith([], {
      relativeTo: expect.any(Object),
      queryParams: { storyType: STORY_TYPES.TOP, page: 3 },
      queryParamsHandling: 'merge'
    });
  });

  it('switchFeed() should update feed and reset to page 1', () => {
    component.switchFeed(STORY_TYPES.NEW);

    expect(component.activeFeed).toBe(STORY_TYPES.NEW);
    expect(router.navigate).toHaveBeenCalledWith([], {
      relativeTo: expect.any(Object),
      queryParams: { storyType: STORY_TYPES.NEW, page: APP_CONSTANTS.intialPage },
      queryParamsHandling: 'merge'
    });
  });
});
