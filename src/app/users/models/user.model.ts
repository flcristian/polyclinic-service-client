import {UserAppointment} from "../../user-appointments/models/user-appointment.model";

export interface User{
  id: number,
  name: string,
  email: string,
  password: string,
  gender: string,
  age: number,
  phone: string,
  type: number,
  userAppointments: UserAppointment[]
}
