import {CreateScheduleSlotRequest} from "./create-schedule-slot-request.model";

export interface CreateScheduleRequest{
  doctorId: number,
  year: number,
  weekNumber: number,
  mondaySchedule: CreateScheduleSlotRequest,
  tuesdaySchedule: CreateScheduleSlotRequest,
  wednesdaySchedule: CreateScheduleSlotRequest,
  thursdaySchedule: CreateScheduleSlotRequest,
  fridaySchedule: CreateScheduleSlotRequest
}
