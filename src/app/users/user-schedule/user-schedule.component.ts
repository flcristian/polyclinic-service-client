import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {User} from "../models/user.model";
import {Schedule} from "../../schedules/models/schedule.model";
import {DoctorUiStateService} from "../services/doctor-ui-state.service";
import {Router} from "@angular/router";
import {Confirmation, ConfirmationService} from "primeng/api";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {UpdateAppointmentRequest} from "../../appointments/models/update-appointment-request.model";
import {UpdateScheduleRequest} from "../../schedules/models/update-schedule-request.model";
import {DatesUtility} from "../../utility/dates.utility";
import {ConfirmPopup} from "primeng/confirmpopup";
import {Time} from "../../schedules/models/time.model";

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
      startTime: {
        hours: 0,
        minutes: 0
      },
      endTime: {
        hours: 0,
        minutes: 0
      }
    },
    tuesdayScheduleId: 0,
    tuesdaySchedule: {
      id: 0,
      startTime: {
        hours: 0,
        minutes: 0
      },
      endTime: {
        hours: 0,
        minutes: 0
      }
    },
    wednesdayScheduleId: 0,
    wednesdaySchedule: {
      id: 0,
      startTime: {
        hours: 0,
        minutes: 0
      },
      endTime: {
        hours: 0,
        minutes: 0
      }
    },
    thursdayScheduleId: 0,
    thursdaySchedule: {
      id: 0,
      startTime: {
        hours: 0,
        minutes: 0
      },
      endTime: {
        hours: 0,
        minutes: 0
      }
    },
    fridayScheduleId: 0,
    fridaySchedule: {
      id: 0,
      startTime: {
        hours: 0,
        minutes: 0
      },
      endTime: {
        hours: 0,
        minutes: 0
      }
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
  protected nextSchedule: Schedule = {
    doctorId: 0,
    mondayScheduleId: 0,
    mondaySchedule: {
      id: 0,
      startTime: {
        hours: 0,
        minutes: 0
      },
      endTime: {
        hours: 0,
        minutes: 0
      }
    },
    tuesdayScheduleId: 0,
    tuesdaySchedule: {
      id: 0,
      startTime: {
        hours: 0,
        minutes: 0
      },
      endTime: {
        hours: 0,
        minutes: 0
      }
    },
    wednesdayScheduleId: 0,
    wednesdaySchedule: {
      id: 0,
      startTime: {
        hours: 0,
        minutes: 0
      },
      endTime: {
        hours: 0,
        minutes: 0
      }
    },
    thursdayScheduleId: 0,
    thursdaySchedule: {
      id: 0,
      startTime: {
        hours: 0,
        minutes: 0
      },
      endTime: {
        hours: 0,
        minutes: 0
      }
    },
    fridayScheduleId: 0,
    fridaySchedule: {
      id: 0,
      startTime: {
        hours: 0,
        minutes: 0
      },
      endTime: {
        hours: 0,
        minutes: 0
      }
    }
  }
  protected nextScheduleExists  = false;
  protected editNextSchedule = false;
  protected days = ["monday", "tuesday", "wednesday", "thursday", "friday"]

  baseTime: Time = {hours:0, minutes: 0};
  protected nextScheduleForm = new FormGroup({
    mondaySchedule: new FormGroup({
      startTime: new FormControl(this.baseTime, Validators.required),
      endTime: new FormControl(this.baseTime, Validators.required),
    }),

    tuesdaySchedule: new FormGroup({
      startTime: new FormControl(this.baseTime, Validators.required),
      endTime: new FormControl(this.baseTime, Validators.required),
    }),

    wednesdaySchedule: new FormGroup({
      startTime: new FormControl(this.baseTime, Validators.required),
      endTime: new FormControl(this.baseTime, Validators.required),
    }),

    thursdaySchedule: new FormGroup({
      startTime: new FormControl(this.baseTime, Validators.required),
      endTime: new FormControl(this.baseTime, Validators.required),
    }),

    fridaySchedule: new FormGroup({
      startTime: new FormControl(this.baseTime, Validators.required),
      endTime: new FormControl(this.baseTime, Validators.required),
    }),
  });

  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  constructor(
    private stateService: DoctorUiStateService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscriptions.add(this.getData())
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  getData(){
    return this.stateService.state$.subscribe({
      next: (data) => {
        if(data.doctor) this.doctor = data.doctor
        if(data.schedule) this.schedule = data.schedule

        if(data.nextSchedule){
          this.nextSchedule = data.nextSchedule
          this.nextScheduleExists = true;
        }
      },
      error: (error) => {
        this.stateService.setError(error)
      }
    })
  }

  updateNextSchedule(event: Event){
    const confirmation: Confirmation = {
    target: event.target as EventTarget,
    message: 'Are you sure you want to update this appointment?',
    accept: () => {
      let values = this.nextScheduleForm.value as Schedule
      console.log(values)
      let request = this.createNewUpdateRequest();
      this.stateService.updateNextSchedule(request);
      }
    };

    this.confirmationService.confirm(confirmation);
  }

  acceptUpdate(){
    this.confirmPopup.accept()
  }

  rejectUpdate() {
    this.confirmPopup.reject()
  }

  createNewUpdateRequest(): UpdateScheduleRequest {
    let nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)
    let baseTime: Time = {hours: 0, minutes: 0}

    return {
      doctorId: this.doctor.id,
      year: nextWeek.getFullYear(),
      weekNumber: DatesUtility.getWeekNumber(nextWeek),
      mondaySchedule: {
        startTime: baseTime,
        endTime: baseTime
      },
      tuesdaySchedule: {
        startTime: baseTime,
        endTime: baseTime
      },
      wednesdaySchedule: {
        startTime: baseTime,
        endTime: baseTime
      },
      thursdaySchedule: {
        startTime: baseTime,
        endTime: baseTime
      },
      fridaySchedule: {
        startTime: baseTime,
        endTime: baseTime
      }
    };
  }

  //addUpdateRequestValues(request: UpdateScheduleRequest, values: FormGroup)
}
