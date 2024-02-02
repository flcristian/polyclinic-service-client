import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserAppointment} from "../models/user-appointment.model";

@Injectable({
  providedIn: 'root'
})
export class UserAppointmentStateService {
  private userAppointmentsSubject = new BehaviorSubject<UserAppointment[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  userAppointments$: Observable<UserAppointment[]> = this.userAppointmentsSubject.asObservable();
  loading$: Observable<boolean> = this.loadingSubject.asObservable();
  error$: Observable<string | null> = this.errorSubject.asObservable();

  constructor() { }

  setUserAppointments(userAppointments: UserAppointment[]) {
    this.userAppointmentsSubject.next(userAppointments);
  }

  addUserAppointment(newUserAppointment: UserAppointment) {
    this.userAppointmentsSubject.next([...this.userAppointmentsSubject.value, newUserAppointment]);
  }

  updateUserAppointment(userAppointment: UserAppointment){
    let userAppointments: UserAppointment[] = this.userAppointmentsSubject.value;
    let newUserAppointments: UserAppointment[] = []

    userAppointments.forEach(p => {
      if(p.id != userAppointment.id) newUserAppointments.push(p)
      else newUserAppointments.push(userAppointment)
    })

    this.userAppointmentsSubject.next(newUserAppointments)
  }

  deleteUserAppointment(userAppointment: UserAppointment){
    let userAppointments: UserAppointment[] = this.userAppointmentsSubject.value;
    let newUserAppointments: UserAppointment[] = []

    userAppointments.forEach(p => {
      if(p.id != userAppointment.id) newUserAppointments.push(p)
    })

    this.userAppointmentsSubject.next(newUserAppointments)
  }

  setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
  }

  setError(error: string | null) {
    this.errorSubject.next(error);
  }
}
