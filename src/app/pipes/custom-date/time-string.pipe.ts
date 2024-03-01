import { Pipe, PipeTransform } from '@angular/core';
import {formatDate, Time} from "@angular/common";

@Pipe({
  name: 'timeString'
})
export class TimeStringPipe implements PipeTransform {

  transform(value: Time): string {
    let timeDate = new Date()
    timeDate.setHours(value.hours)
    timeDate.setMinutes(value.minutes)

    return formatDate(timeDate, "HH:mm", 'en-US');
  }
}
