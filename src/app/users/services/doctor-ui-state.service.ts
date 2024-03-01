import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user.model";
import {UserService} from "./user.service";
import {CreateUserRequest} from "../models/create-user-request.model";
import {UpdateUserRequest} from "../models/update-user-request.model";
import {DoctorUiState} from "./doctor-ui-state";
import {Schedule} from "../../schedules/models/schedule.model";
import {ScheduleService} from "../../schedules/services/schedule.service";

@Injectable({
  providedIn: 'root'
})
export class DoctorUiStateService {
  private stateSubject = new BehaviorSubject<DoctorUiState>({
    doctor: null,
    schedule: null,
    loading: false,
    error: null
  });
  state$: Observable<DoctorUiState> = this.stateSubject.asObservable();

  constructor(
    private userService: UserService,
    private scheduleService: ScheduleService
  ) { }

  // For testing

  getUser(id: number){
    this.setLoading(true)
    return this.userService.getUser(id)
  }

  getSchedule(doctorId: number, date: Date){
    this.setLoading(true)
    return this.scheduleService.getSchedule(doctorId, date)
  }

  // Service calls

  updateUser(request: UpdateUserRequest){
    this.setLoading(true)
    this.userService.updateUser(request).subscribe({
      next: (user) => {
        this.setDoctor(user)
      },
      error: (error) => {
        this.setError(error)
      },
      complete: () => {
        this.setLoading(false)
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

  setLoading(loading: boolean) {
    this.setState({loading})
  }

  setError(error: string | null) {
    this.setState({error});
  }

  setState(partialState: Partial<DoctorUiState>){
    this.stateSubject.next({...this.stateSubject.value,...partialState})
  }
}
