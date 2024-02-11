import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Appointment} from "../models/appointment.model";
import {AppointmentState} from "./appointment-state";
import {AppointmentService} from "./appointment.service";
import {UpdateAppointmentRequest} from "../models/update-appointment-request.model";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {CreateAppointmentRequest} from "../models/create-appointment-request.model";

@Injectable({
  providedIn: 'root'
})
export class AppointmentStateService {
  private stateSubject = new BehaviorSubject<AppointmentState>({
    appointments: [],
    loading: false,
    error: null,
    selectedAppointment: null
  });
  state$: Observable<AppointmentState> = this.stateSubject.asObservable();

  constructor(private service: AppointmentService) { }

  // Service calls

  createAppointment(request: CreateAppointmentRequest){
    this.setLoading(true)
    return this.service.createAppointment(request)
  }

  updateAppointment(request: UpdateAppointmentRequest){
    this.setLoading(true)
    return this.service.updateAppointment(request)
  }

  deleteAppointment(id: number){
    this.setLoading(true)
    return this.service.deleteAppointment(id)
  }

  getAppointment(id: number){
    this.setLoading(true)
    return this.service.getAppointment(id)
  }

  getAppointments(){
    this.setLoading(true)
    return this.service.getAppointments()
  }

  // State updaters

  addAppointment(newAppointment: Appointment) {
    let appointments: Appointment[] = [...this.stateSubject.value.appointments, newAppointment]
    this.setState({appointments})
  }

  removeAppointment(appointment: Appointment){
    let oldAppointments: Appointment[] = this.stateSubject.value.appointments
    let appointments: Appointment[] = []

    oldAppointments.forEach(p => {
      if(p.id != appointment.id) appointments.push(p)
    })

    this.setState({appointments})
  }

  editAppointment(appointment: Appointment){
    let oldAppointments: Appointment[] = this.stateSubject.value.appointments
    let appointments: Appointment[] = []

    oldAppointments.forEach(p => {
      appointments.push(p.id === appointment.id ? appointment : p);
    })

    this.setState({appointments})
  }

  // State setters

  setLoading(loading: boolean) {
    this.setState({loading})
  }

  setError(error: string | null) {
    this.setState({error});
  }

  setSelectedAppointment(selectedAppointment: Appointment){
    this.setState({selectedAppointment})
  }

  setAppointments(appointments: Appointment[]) {
    this.setState({appointments})
  }

  setState(partialState: Partial<AppointmentState>){
    this.stateSubject.next({...this.stateSubject.value,...partialState})
  }
}
