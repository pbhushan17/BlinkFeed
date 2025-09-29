import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsCardComponent } from './news-card.component';
import { NewsItem } from '../../models/news-item.model';

describe('NewsCardComponent', () => {
  let component: NewsCardComponent;
  let fixture: ComponentFixture<NewsCardComponent>;

  const mockStory: NewsItem = {
    id: 1,
    title: 'Test Story',
    url: 'https://testStory.com',
    by: 'bhushan',
    time: 1234567890,
    type: 'story',
    score: 17,
    descendants: 9,
    kids: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsCardComponent);
    component = fixture.componentInstance;
    component.story = mockStory;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
