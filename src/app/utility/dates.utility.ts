import {Time} from "../schedules/models/time.model";

export class DatesUtility {
  static getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.valueOf() - firstDayOfYear.valueOf()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay()) / 7);
  }

  static stringToTime(timeStr: string): Time {
    if(!timeStr){
      return {hours: 0, minutes: 0};
    }
    const [hours, minutes] = timeStr.split(":").map(Number);
    return {hours, minutes};
  }
}
