import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
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
    this.service.createAppointment(request).subscribe({
      next: (newAppointment) => {
        this.addAppointment(newAppointment)
      },
      error: (error) => {
        this.setError(error)
      },
      complete: () => {
        this.setLoading(false)
      }
    })
  }

  updateAppointment(request: UpdateAppointmentRequest){
    this.setLoading(true)
    this.service.updateAppointment(request).subscribe({
      next: (newAppointment) => {
        this.editAppointment(newAppointment)
      },
      error: (error) => {
        this.setError(error)
      },
      complete: () => {
        this.setLoading(false)
      }
    })
  }

  deleteAppointment(id: number){
    this.setLoading(true)
    this.service.deleteAppointment(id).subscribe({
      next: () => {
        this.removeAppointment(id)
      },
      error: (error) => {
        this.setError(error)
      },
      complete: () => {
        this.setLoading(false)
      }
    })
  }

  deleteSelectedAppointment(){
    this.setLoading(true)
    let appointment = this.stateSubject.value.selectedAppointment
    if(appointment){
      this.service.deleteAppointment(appointment.id).subscribe({
        next: () => {
          this.removeAppointment(appointment!.id)
          this.setSelectedAppointment(null)
        },
        error: (error) => {
          this.setError(error)
        },
        complete: () => {
          this.setLoading(false)
        }
      })
    }
  }

  updateSelectedAppointment(request: UpdateAppointmentRequest){
    this.setLoading(true)
    let appointment = this.stateSubject.value.selectedAppointment
    if(appointment) {
      request.id = appointment.id
      this.service.updateAppointment(request).subscribe({
        next: (newAppointment) => {
          this.editAppointment(newAppointment)
          this.setSelectedAppointment(newAppointment)
        },
        error: (error) => {
          this.setError(error)
        },
        complete: () => {
          this.setLoading(false)
        }
      })
    }
  }

  getAppointment(id: number){
    this.setLoading(true)
    return this.service.getAppointment(id)
  }

  getAppointments(){
    this.setLoading(true)
    return this.service.getAppointments()
  }

  getFilteredAppointments(startDate: Date, endDate: Date): Observable<Appointment[]> {
    return this.getAppointments().pipe(
      map(appointments => {
        return appointments.filter(appointment => {
          return appointment.startDate >= startDate && appointment.endDate <= endDate
        })
      })
    )
  }

  // State updaters

  addAppointment(newAppointment: Appointment) {
    let appointments: Appointment[] = [...this.stateSubject.value.appointments, newAppointment]
    this.setState({appointments})
  }

  removeAppointment(id: number){
    let oldAppointments: Appointment[] = this.stateSubject.value.appointments
    let appointments: Appointment[] = []

    oldAppointments.forEach(p => {
      if(p.id != id) appointments.push(p)
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

  setSelectedAppointmentById (id: number){
    let selectedAppointment= this.stateSubject.value.appointments.filter(val=> val.id == id)[0];

    this.setState({selectedAppointment})
  }

  setSelectedAppointment(selectedAppointment: Appointment | null) {
    this.setState({selectedAppointment})
  }

  setAppointments(appointments: Appointment[]) {
    this.setState({appointments})
  }

  setState(partialState: Partial<AppointmentState>){
    this.stateSubject.next({...this.stateSubject.value,...partialState})
  }
}
