import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user.model";
import {UserService} from "./user.service";
import {CreateUserRequest} from "../models/create-user-request.model";
import {UpdateUserRequest} from "../models/update-user-request.model";
import {DoctorUiState} from "./doctor-ui-state";
import {Schedule} from "../../schedules/models/schedule.model";
import {ScheduleService} from "../../schedules/services/schedule.service";
import {UpdateAppointmentRequest} from "../../appointments/models/update-appointment-request.model";
import {UpdateScheduleRequest} from "../../schedules/models/update-schedule-request.model";
import {CreateScheduleRequest} from "../../schedules/models/create-schedule-request.model";

@Injectable({
  providedIn: 'root'
})
export class DoctorUiStateService {
  private stateSubject = new BehaviorSubject<DoctorUiState>({
    doctor: null,
    schedule: null,
    nextSchedule: null,
    loadingDoctor: false,
    loadingSchedule: false,
    loadingNextSchedule: false,
    error: null
  });
  state$: Observable<DoctorUiState> = this.stateSubject.asObservable();

  constructor(
    private userService: UserService,
    private scheduleService: ScheduleService
  ) { }

  // Service calls

  getUser(id: number){
    this.setLoadingDoctor(true)
    return this.userService.getUser(id)
  }

  getSchedule(doctorId: number, date: Date){
    this.setLoadingSchedule(true)
    return this.scheduleService.getSchedule(doctorId, date)
  }

  getNextSchedule(doctorId: number, date: Date){
    this.setLoadingNextSchedule(true)
    return this.scheduleService.getSchedule(doctorId, date)
  }

  updateNextSchedule(request: UpdateScheduleRequest){
    this.setLoadingNextSchedule(true)
    this.scheduleService.updateSchedule(request).subscribe({
      next: (newSchedule) => {
        this.setNextSchedule(newSchedule)
      },
      error: (error) => {
        this.setError(error)
      },
      complete: () => {
        this.setLoadingNextSchedule(false)
      }
    })
  }

  createNextSchedule(request: CreateScheduleRequest){
    this.setLoadingNextSchedule(true)
    this.scheduleService.createSchedule(request).subscribe({
      next: (newSchedule) => {
        this.setNextSchedule(newSchedule)
      },
      error: (error) => {
        this.setError(error)
      },
      complete: () => {
        this.setLoadingNextSchedule(false)
      }
    })
  }

  updateUser(request: UpdateUserRequest){
    this.setLoadingDoctor(true)
    this.userService.updateUser(request).subscribe({
      next: (user) => {
        this.setDoctor(user)
      },
      error: (error) => {
        this.setError(error)
      },
      complete: () => {
        this.setLoadingDoctor(false)
      }
    })
  }

  // State setters

  setDoctor(doctor: User){
    this.setState({doctor})
  }

  setSchedule(schedule: Schedule){
    this.setState({schedule})
  }

  setNextSchedule(nextSchedule: Schedule){
    this.setState({nextSchedule})
  }

  setLoadingDoctor(loadingDoctor: boolean) {
    this.setState({loadingDoctor})
  }

  setLoadingSchedule(loadingSchedule: boolean) {
    this.setState({loadingSchedule})
  }

  setLoadingNextSchedule(loadingNextSchedule: boolean) {
    this.setState({loadingNextSchedule})
  }

  setError(error: string | null) {
    this.setState({error});
  }

  setState(partialState: Partial<DoctorUiState>){
    this.stateSubject.next({...this.stateSubject.value,...partialState})
  }
}
