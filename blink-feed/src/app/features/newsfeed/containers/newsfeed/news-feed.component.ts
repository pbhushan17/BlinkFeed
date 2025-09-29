import { Component, OnInit } from '@angular/core';
import { NewsStoreService } from '../../services/news-store.service';
import { CommonModule } from '@angular/common';
import { APP_CONSTANTS, STORY_TYPES, StoryType } from '../../../../app.constants';
import { NewsCardComponent } from '../../components/news-card/news-card.component';
import { ActivatedRoute, Router  } from '@angular/router';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { NavPillComponent } from '../../components/nav-pill/nav-pill.component';

@Component({
  selector: 'app-news-feed',
  standalone: true,
  imports: [CommonModule, NewsCardComponent, PaginationComponent, NavPillComponent],
  templateUrl: './news-feed.component.html',
  styleUrl: './news-feed.component.css'
})
export class NewsFeedComponent implements OnInit {
  activeFeed: StoryType = STORY_TYPES.TOP;
  constructor(private router: Router, private route: ActivatedRoute, readonly newsStore: NewsStoreService){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const feed = params['storyType'] || STORY_TYPES.TOP;
      const page = params['page'] || APP_CONSTANTS.intialPage;

      this.activeFeed = feed;
      this.newsStore.loadStories(feed, page);
    });
  }

  loadPage(page: number) {
    this.routeNavigate(this.activeFeed, page);
  }

  switchFeed(storyType: StoryType) {
    this.activeFeed = storyType;
    this.routeNavigate(storyType, APP_CONSTANTS.intialPage);
  }

  routeNavigate(storyType: StoryType, page: number) {
    this.router.navigate([], {
      relativeTo : this.route,
      queryParams : { storyType, page},
      queryParamsHandling: 'merge'
    });
  }
}
