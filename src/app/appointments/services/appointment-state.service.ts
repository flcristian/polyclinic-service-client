import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Appointment} from "../models/appointment.model";
import {AppointmentState} from "./appointment-state";


@Injectable({
  providedIn: 'root'
})
export class AppointmentStateService {
  private stateSubject = new BehaviorSubject<AppointmentState>({
    appointments: [],
    loading: false,
    error: null
  });
  state$: Observable<AppointmentState> = this.stateSubject.asObservable();

  constructor() { }

  setAppointments(appointments: Appointment[]) {
    this.setState({appointments})
  }

  addAppointment(newAppointment: Appointment) {
    let appointments: Appointment[] = [...this.stateSubject.value.appointments, newAppointment]
    this.setState({appointments})
  }

  updateAppointment(appointment: Appointment){
    let oldAppointments: Appointment[] = this.stateSubject.value.appointments;
    let appointments: Appointment[] = []

    oldAppointments.forEach(p => {
      if(p.id != appointment.id) appointments.push(p)
      else appointments.push(appointment)
    })

    this.setState({appointments})
  }

  deleteAppointment(appointment: Appointment){
    let oldAppointments: Appointment[] = this.stateSubject.value.appointments
    let appointments: Appointment[] = []

    oldAppointments.forEach(p => {
      if(p.id != appointment.id) appointments.push(p)
    })

    this.setState({appointments})
  }

  setLoading(loading: boolean) {
    this.setState({loading})
  }

  setError(error: string | null) {
    this.setState({error});
  }

  setState(partialState: Partial<AppointmentState>){
    this.stateSubject.next({...this.stateSubject.value,...partialState})
  }
}
