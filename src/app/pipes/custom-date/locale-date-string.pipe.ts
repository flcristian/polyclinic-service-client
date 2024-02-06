import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localeDateString'
})
export class LocaleDateStringPipe implements PipeTransform {

  transform(value: Date | string, format: string = 'shortDate'): string {
    let date: Date

    if(typeof value === 'string') date = new Date(value)
    else date = value

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  }
}
