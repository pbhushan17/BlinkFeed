import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comment',
  standalone: true
})
export class CommentPipe implements PipeTransform {
  transform(count: number | null | undefined): string {
    if (!count || count === 0) {
      return 'discuss';
    }
    if (count === 1) {
      return '1 comment';
    }
    return `${count} comments`;
  }
}
