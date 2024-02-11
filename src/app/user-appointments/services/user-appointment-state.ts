import {UserAppointment} from "../models/user-appointment.model";

export interface UserAppointmentState{
  userAppointments: UserAppointment[],
  loading: boolean,
  error: string | null,
  selectedUserAppointment: UserAppointment | null
}
