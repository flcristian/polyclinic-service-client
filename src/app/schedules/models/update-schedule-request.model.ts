import {UpdateScheduleSlotRequest} from "./update-schedule-slot-request.model";

export interface UpdateScheduleRequest{
  doctorId: number,
  year: number,
  weekNumber: number,
  mondaySchedule: UpdateScheduleSlotRequest,
  tuesdaySchedule: UpdateScheduleSlotRequest,
  wednesdaySchedule: UpdateScheduleSlotRequest,
  thursdaySchedule: UpdateScheduleSlotRequest,
  fridaySchedule: UpdateScheduleSlotRequest
}
