import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {User} from "../models/user.model";
import {Schedule} from "../../schedules/models/schedule.model";
import {DoctorUiStateService} from "../services/doctor-ui-state.service";
import {Router} from "@angular/router";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-user-schedule',
  templateUrl: './user-schedule.component.html'
})
export class UserScheduleComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  protected schedule: Schedule = {
    doctorId: 0,
    mondayScheduleId: 0,
    mondaySchedule: {
      id: 0,
      startDate: new Date(),
      endDate: new Date()
    },
    tuesdayScheduleId: 0,
    tuesdaySchedule: {
      id: 0,
      startDate: new Date(),
      endDate: new Date()
    },
    wednesdayScheduleId: 0,
    wednesdaySchedule: {
      id: 0,
      startDate: new Date(),
      endDate: new Date()
    },
    thursdayScheduleId: 0,
    thursdaySchedule: {
      id: 0,
      startDate: new Date(),
      endDate: new Date()
    },
    fridayScheduleId: 0,
    fridaySchedule: {
      id: 0,
      startDate: new Date(),
      endDate: new Date()
    }
  }
  protected doctor: User = {
    id: 0,
    name: '',
    age: 0,
    gender: 'Male',
    phone: '',
    email: '',
    password: '',
    userAppointments: [],
    workSchedule: this.schedule,
    type: 2
  }

  constructor(
    private stateService: DoctorUiStateService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscriptions.add(this.getDoctor())
  }

  getDoctor(){
    return this.stateService.state$.subscribe({
      next: (data) => {
        if(data.doctor && data.doctor.workSchedule) {
          this.doctor = data.doctor
          this.schedule = data.doctor!.workSchedule
          console.log(this.schedule)
        }
      },
      error: (error) => {
        this.stateService.setError(error)
      }
    })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
