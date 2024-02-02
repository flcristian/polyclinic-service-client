import {User} from "../../users/models/user.model";

export interface Schedule {
  doctorId: number,
  mondayScheduleId: number,
  mondaySchedule: Date,
  tuesdayScheduleId: number,
  tuesdaySchedule: Date,
  wednesdayScheduleId: number,
  wednesdaySchedule: Date,
  thursdayScheduleId: number,
  thursdaySchedule: Date,
  fridayScheduleId: number,
  fridaySchedule: Date,
  doctor: User
}
