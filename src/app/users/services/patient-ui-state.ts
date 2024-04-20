import {User} from "../models/user.model";
import {Appointment} from "../../appointments/models/appointment.model";

export interface PatientUiState{
  patient: User | null,
  appointments: Appointment[],
  loadingPatient: boolean,
  loadingAppointments: boolean,
  error: string | null
}
