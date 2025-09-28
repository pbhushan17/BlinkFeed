import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsItem } from '../../models/news-item.model';
import { TimePipe } from '../../pipes/time.pipe';
import { CommentPipe } from '../../pipes/comment.pipe';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule, TimePipe, CommentPipe],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.css'
})
export class NewsCardComponent {
  @Input() story!: NewsItem;
}
