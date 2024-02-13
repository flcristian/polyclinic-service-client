import {User} from "../../users/models/user.model";
import {Appointment} from "../../appointments/models/appointment.model";

export interface UserAppointment{
  id: number,
  user: User,
  appointment: Appointment
}
