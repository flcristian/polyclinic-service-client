import {UserAppointment} from "../../user-appointments/models/user-appointment.model";
import {Schedule} from "../../schedules/models/schedule.model";

export interface User{
  id: number,
  name: string,
  email: string,
  password: string,
  gender: string,
  age: number,
  phone: string,
  type: number,
  userAppointments: UserAppointment[],
  workSchedule: Schedule
}
