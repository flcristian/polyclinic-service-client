import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserAppointmentState} from "./user-appointment-state";
import {UserAppointmentService} from "./user-appointment.service";
import {CreateUserAppointmentRequest} from "../models/create-user-appointment-request.model";
import {UpdateUserAppointmentRequest} from "../models/update-user-appointment-request.model";
import {UserAppointment} from "../models/user-appointment.model";

@Injectable({
  providedIn: 'root'
})
export class UserAppointmentStateService {
  private stateSubject = new BehaviorSubject<UserAppointmentState>({
    userAppointments: [],
    loading: false,
    error: null,
    selectedUserAppointment: null
  });
  state$: Observable<UserAppointmentState> = this.stateSubject.asObservable();

  constructor(private service: UserAppointmentService) { }

  // Service calls

  createUserAppointment(request: CreateUserAppointmentRequest){
    this.setLoading(true)
    return this.service.createUserAppointment(request)
  }

  updateUserAppointment(request: UpdateUserAppointmentRequest){
    this.setLoading(true)
    return this.service.updateUserAppointment(request)
  }

  deleteUserAppointment(id: number){
    this.setLoading(true)
    return this.service.deleteUserAppointment(id)
  }

  getUserAppointment(id: number){
    this.setLoading(true)
    return this.service.getUserAppointment(id)
  }

  getUserAppointments(){
    this.setLoading(true)
    return this.service.getUserAppointments()
  }

  // State updaters

  addUserAppointment(newUserAppointment: UserAppointment) {
    let userAppointments: UserAppointment[] = [...this.stateSubject.value.userAppointments, newUserAppointment]
    this.setState({userAppointments})
  }

  removeUserAppointment(userAppointment: UserAppointment){
    let oldUserAppointments: UserAppointment[] = this.stateSubject.value.userAppointments
    let userAppointments: UserAppointment[] = []

    oldUserAppointments.forEach(p => {
      if(p.id != userAppointment.id) userAppointments.push(p)
    })

    this.setState({userAppointments})
  }

  editUserAppointment(userAppointment: UserAppointment){
    let oldUserAppointments: UserAppointment[] = this.stateSubject.value.userAppointments
    let userAppointments: UserAppointment[] = []

    oldUserAppointments.forEach(p => {
      userAppointments.push(p.id === userAppointment.id ? userAppointment : p);
    })

    this.setState({userAppointments})
  }

  // State setters

  setLoading(loading: boolean) {
    this.setState({loading})
  }

  setError(error: string | null) {
    this.setState({error});
  }

  setSelectedUserAppointment(selectedUserAppointment: UserAppointment){
    this.setState({selectedUserAppointment})
  }

  setUserAppointments(userAppointments: UserAppointment[]) {
    this.setState({userAppointments})
  }

  setState(partialState: Partial<UserAppointmentState>){
    this.stateSubject.next({...this.stateSubject.value,...partialState})
  }
}
