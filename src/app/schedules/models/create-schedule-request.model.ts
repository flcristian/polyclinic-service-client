import {CreateScheduleSlotRequest} from "./create-schedule-slot-request.model";

export interface CreateScheduleRequest{
  mondaySchedule: CreateScheduleSlotRequest,
  tuesdaySchedule: CreateScheduleSlotRequest,
  wednesdaySchedule: CreateScheduleSlotRequest,
  thursdaySchedule: CreateScheduleSlotRequest,
  fridaySchedule: CreateScheduleSlotRequest
}
