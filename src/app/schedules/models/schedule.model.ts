import {ScheduleSlot} from "./schedule-slot.model";

export interface Schedule {
  doctorId: number,
  mondayScheduleId: number,
  mondaySchedule: ScheduleSlot,
  tuesdayScheduleId: number,
  tuesdaySchedule: ScheduleSlot,
  wednesdayScheduleId: number,
  wednesdaySchedule: ScheduleSlot,
  thursdayScheduleId: number,
  thursdaySchedule: ScheduleSlot,
  fridayScheduleId: number,
  fridaySchedule: ScheduleSlot
}
