import { Component, EventEmitter, Input, Output } from '@angular/core';
import { STORY_TYPES, StoryType } from '../../../../app.constants';

@Component({
  selector: 'app-nav-pill',
  standalone: true,
  imports: [],
  templateUrl: './nav-pill.component.html',
  styleUrl: './nav-pill.component.css'
})
export class NavPillComponent {
  @Input() activeFeed : StoryType = STORY_TYPES.TOP;
  @Output() feedChange = new EventEmitter<StoryType>();

  selectFeed(storyType: StoryType) {
    this.feedChange.emit(storyType);
  }
}
