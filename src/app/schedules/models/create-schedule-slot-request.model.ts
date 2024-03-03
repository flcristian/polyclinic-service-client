import {Time} from "./time.model";

export interface CreateScheduleSlotRequest{
  startTime: Time,
  endTime: Time
}
