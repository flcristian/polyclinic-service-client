import { Injectable } from '@angular/core';
import {AppointmentStateService} from "./appointment-state.service";
import {HttpClient} from "@angular/common/http";
import {Appointment} from "../models/appointment.model";
import {CreateAppointmentRequest} from "../models/create-appointment-request.model";
import {UpdateAppointmentRequest} from "../models/update-appointment-request.model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointmentsServer: string = "http://localhost:5275/api/v1/Appointments";
  private userAppointmentsServer: string = "http://localhost:5275/api/v1/UserAppointments";

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.appointmentsServer + "/all")
  }

  getAppointmentsByUserId(userId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.userAppointmentsServer + `/appointments_of_user/${userId}`)
  }

  getAppointment(appointmentId: number): Observable<Appointment> {
    return this.http.get<Appointment>(this.appointmentsServer + `/appointment/${appointmentId}`)
  }

  createAppointment(newAppointment: CreateAppointmentRequest): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.appointmentsServer}/create`, newAppointment)
  }

  updateAppointment(updatedAppointment: UpdateAppointmentRequest): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.appointmentsServer}/update`, updatedAppointment)
  }

  deleteAppointment(id: number): Observable<Appointment> {
    return this.http.delete<Appointment>(`${this.appointmentsServer}/delete/${id}`)
  }
}
