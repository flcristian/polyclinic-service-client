import {User} from "../models/user.model";
import {Schedule} from "../../schedules/models/schedule.model";

export interface DoctorUiState{
  doctor: User | null,
  schedule: Schedule | null,
  nextSchedule: Schedule | null,
  loading: boolean,
  error: string | null
}
