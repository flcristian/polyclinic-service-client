import {Time} from "@angular/common";

export interface ScheduleSlot {
  id: number,
  startTime: Time,
  endTime: Time
}
