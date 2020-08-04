import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieDuration',
})
export class MovieDurationPipe implements PipeTransform {
  readonly MINUTES_IN_AN_HOUR = 60;

  transform(movieRuntime: number): string {
    const hours = Math.floor(movieRuntime / this.MINUTES_IN_AN_HOUR);
    const minutes = Math.floor(movieRuntime % this.MINUTES_IN_AN_HOUR);
    let durationStr = '';
    if (hours) {
      durationStr += `${hours}h `;
    }
    if (minutes) {
      durationStr += `${minutes}m`;
    }
    return durationStr;
  }
}
