import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true
})

export class TimePipe implements PipeTransform {
  transform(unixTime: number): string {
    if (!unixTime) return '';

    const now = Math.floor(Date.now() / 1000);
    const diff = now - unixTime;

    const seconds = diff;
    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);

    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }
    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    }
    if (hours < 24) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
}
