import {UserAppointment} from "../../user-appointments/models/user-appointment.model";

export interface Appointment{
  id: number,
  startDate: Date,
  endDate: Date,
  userAppointments: UserAppointment[]
}
