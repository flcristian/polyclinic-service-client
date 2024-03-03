import {Time} from "./time.model";


export interface ScheduleSlot {
  id: number,
  startTime: Time,
  endTime: Time
}
