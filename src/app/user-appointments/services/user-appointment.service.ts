import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserAppointment} from "../models/user-appointment.model";
import {UserAppointmentStateService} from "./user-appointment-state.service";

@Injectable({
  providedIn: 'root'
})
export class UserAppointmentService {
  private server: string = "http://localhost:5275/api/v1/UserAppointments";

  constructor(private http: HttpClient, private userAppointmentState: UserAppointmentStateService) { }

  getUserAppointments(): Observable<UserAppointment[]> {
    this.userAppointmentState.setLoading(true)
    return this.http.get<UserAppointment[]>(this.server + "/all")
  }

  getUserAppointment(userAppointmentId: number): Observable<UserAppointment> {
    this.userAppointmentState.setLoading(true)
    return this.http.get<UserAppointment>(this.server + `/userAppointment/${userAppointmentId}`)
  }
}
