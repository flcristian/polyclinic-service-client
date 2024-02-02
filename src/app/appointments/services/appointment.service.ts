import { Injectable } from '@angular/core';
import {AppointmentStateService} from "./appointment-state.service";
import {HttpClient} from "@angular/common/http";
import {Appointment} from "../models/appointment.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private server: string = "http://localhost:5275/api/v1/Appointments";

  constructor(private http: HttpClient, private appointmentState: AppointmentStateService) { }

  getAppointments(): Observable<Appointment[]> {
    this.appointmentState.setLoading(true)
    return this.http.get<Appointment[]>(this.server + "/all")
  }

  getAppointment(appointmentId: number): Observable<Appointment> {
    this.appointmentState.setLoading(true)
    return this.http.get<Appointment>(this.server + `/appointment/${appointmentId}`)
  }

  createAppointment(newAppointment: CreateAppointmentRequest): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.server}/create`, newAppointment)
  }

  updateAppointment(updatedAppointment: UpdateAppointmentRequest): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.server}/update`, updatedAppointment)
  }

  deleteAppointment(id: number): Observable<Appointment> {
    return this.http.delete<Appointment>(`${this.server}/delete/${id}`)
  }
}
