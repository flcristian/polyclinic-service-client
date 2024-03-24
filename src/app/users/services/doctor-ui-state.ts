import {User} from "../models/user.model";
import {Schedule} from "../../schedules/models/schedule.model";
import {Appointment} from "../../appointments/models/appointment.model";

export interface DoctorUiState{
  doctor: User | null,
  appointments: Appointment[],
  schedule: Schedule | null,
  nextSchedule: Schedule | null,
  loadingDoctor: boolean,
  loadingAppointments: boolean,
  loadingSchedule: boolean,
  loadingNextSchedule: boolean,
  error: string | null
}
