import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Appointment} from "../models/appointment.model";

@Injectable({
  providedIn: 'root'
})
export class AppointmentStateService {
  private appointmentsSubject = new BehaviorSubject<Appointment[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  appointments$: Observable<Appointment[]> = this.appointmentsSubject.asObservable();
  loading$: Observable<boolean> = this.loadingSubject.asObservable();
  error$: Observable<string | null> = this.errorSubject.asObservable();

  constructor() { }

  setAppointments(appointments: Appointment[]) {
    this.appointmentsSubject.next(appointments);
  }

  addAppointment(newAppointment: Appointment) {
    this.appointmentsSubject.next([...this.appointmentsSubject.value, newAppointment]);
  }

  updateAppointment(appointment: Appointment){
    let appointments: Appointment[] = this.appointmentsSubject.value;
    let newAppointments: Appointment[] = []

    appointments.forEach(p => {
      if(p.id != appointment.id) newAppointments.push(p)
      else newAppointments.push(appointment)
    })

    this.appointmentsSubject.next(newAppointments)
  }

  deleteAppointment(appointment: Appointment){
    let appointments: Appointment[] = this.appointmentsSubject.value;
    let newAppointments: Appointment[] = []

    appointments.forEach(p => {
      if(p.id != appointment.id) newAppointments.push(p)
    })

    this.appointmentsSubject.next(newAppointments)
  }

  setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
  }

  setError(error: string | null) {
    this.errorSubject.next(error);
  }
}
