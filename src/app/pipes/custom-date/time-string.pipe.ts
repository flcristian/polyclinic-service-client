import { Pipe, PipeTransform } from '@angular/core';
import {formatDate, Time} from "@angular/common";

@Pipe({
  name: 'timeString'
})
export class TimeStringPipe implements PipeTransform {

  transform(value: Time | string): string {
    let time : Time;
    if(typeof(value) === "string"){
      let parts = value.split(':');
      time = {
        hours: parseInt(parts[0]),
        minutes: parseInt(parts[1])
      };
    }
    else {
      time = value;
    }

    let timeDate = new Date()
    timeDate.setHours(time.hours)
    timeDate.setMinutes(time.minutes)

    return formatDate(timeDate, "HH:mm", 'en-US');
  }
}
