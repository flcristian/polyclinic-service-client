import {User} from "../models/user.model";
import {Schedule} from "../../schedules/models/schedule.model";

export interface DoctorUiState{
  doctor: User | null,
  schedule: Schedule | null,
  nextSchedule: Schedule | null,
  loadingDoctor: boolean,
  loadingSchedule: boolean,
  loadingNextSchedule: boolean,
  error: string | null
}
