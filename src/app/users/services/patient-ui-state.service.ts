import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../models/user.model";
import {UserService} from "./user.service";
import {UpdateUserRequest} from "../models/update-user-request.model";
import {PatientUiState} from "./patient-ui-state";
import {Appointment} from "../../appointments/models/appointment.model";
import {AppointmentService} from "../../appointments/services/appointment.service";

@Injectable({
  providedIn: 'root'
})
export class PatientUiStateService {
  private stateSubject = new BehaviorSubject<PatientUiState>({
    patient: null,
    appointments: [],
    loadingPatient: false,
    loadingAppointments: false,
    error: null
  });
  state$: Observable<PatientUiState> = this.stateSubject.asObservable();

  constructor(
    private userService: UserService,
    private appointmentService: AppointmentService
  ) { }

  // Service calls

  getUser(id: number){
    this.setLoadingPatient(true)
    return this.userService.getUser(id)
  }

  getAppointments(patientId: number){
    this.setLoadingAppontments(true);
    return this.appointmentService.getAppointmentsByUserId(patientId)
  }

  getFilteredAppointments(patientId: number, startDate: Date, endDate: Date){
    return this.getAppointments(patientId).pipe(
      map(appointments => {
        return appointments.filter(appointment => {
          return appointment.startDate >= startDate && appointment.endDate <= endDate
        })
      })
    )
  }

  updateUser(request: UpdateUserRequest){
    this.setLoadingPatient(true)
    this.userService.updateUser(request).subscribe({
      next: (user) => {
        this.setPatient(user)
      },
      error: (error) => {
        this.setError(error)
      },
      complete: () => {
        this.setLoadingPatient(false)
      }
    })
  }

  // State setters

  setPatient(patient: User){
    this.setState({patient})
  }

  setAppointments(appointments: Appointment[]){
    this.setState({appointments});
  }

  setLoadingPatient(loadingPatient: boolean) {
    this.setState({loadingPatient})
  }

  setLoadingAppontments(loadingAppointments: boolean){
    this.setState({loadingAppointments});
  }

  setError(error: string | null) {
    this.setState({error});
  }

  setState(partialState: Partial<PatientUiState>){
    this.stateSubject.next({...this.stateSubject.value,...partialState})
  }
}
