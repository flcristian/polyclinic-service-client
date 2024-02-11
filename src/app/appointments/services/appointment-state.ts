import {Appointment} from "../models/appointment.model";

export interface AppointmentState{
  appointments: Appointment[],
  loading: boolean,
  error: string | null,
  selectedAppointment: Appointment | null
}
