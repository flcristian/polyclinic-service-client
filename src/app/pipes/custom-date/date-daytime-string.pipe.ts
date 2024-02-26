import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'daytimeString'
})
export class DateDaytimeStringPipe implements PipeTransform {

  transform(value: Date | string, format: string = 'shortDate'): string {
    let date: Date

    if(typeof value === 'string') date = new Date(value)
    else date = value

    const datepipe: DatePipe = new DatePipe('en-US')

    return datepipe.transform(date, 'HH:mm') as string
  }
}
