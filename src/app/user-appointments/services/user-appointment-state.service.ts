import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserAppointmentState} from "./user-appointment-state";
import {UserAppointment} from "../models/user-appointment.model";


@Injectable({
  providedIn: 'root'
})
export class UserAppointmentStateService {
  private stateSubject = new BehaviorSubject<UserAppointmentState>({
    userAppointments: [],
    loading: false,
    error: null
  });
  state$: Observable<UserAppointmentState> = this.stateSubject.asObservable();

  constructor() { }

  setUserAppointments(userAppointments: UserAppointment[]) {
    this.setState({userAppointments})
  }

  addUserAppointment(newUserAppointment: UserAppointment) {
    let userAppointments: UserAppointment[] = [...this.stateSubject.value.userAppointments, newUserAppointment]
    this.setState({userAppointments})
  }

  updateUserAppointment(userAppointment: UserAppointment){
    let oldUserAppointments: UserAppointment[] = this.stateSubject.value.userAppointments;
    let userAppointments: UserAppointment[] = []

    oldUserAppointments.forEach(p => {
      if(p.id != userAppointment.id) userAppointments.push(p)
      else userAppointments.push(userAppointment)
    })

    this.setState({userAppointments})
  }

  deleteUserAppointment(userAppointment: UserAppointment){
    let oldUserAppointments: UserAppointment[] = this.stateSubject.value.userAppointments
    let userAppointments: UserAppointment[] = []

    oldUserAppointments.forEach(p => {
      if(p.id != userAppointment.id) userAppointments.push(p)
    })

    this.setState({userAppointments})
  }

  setLoading(loading: boolean) {
    this.setState({loading})
  }

  setError(error: string | null) {
    this.setState({error});
  }

  setState(partialState: Partial<UserAppointmentState>){
    this.stateSubject.next({...this.stateSubject.value,...partialState})
  }
}
