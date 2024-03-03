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

  private defaultTime: Time = { hours: 0, minutes: 0 };
  protected timeForm = (time? : Time) => new FormGroup({
    hours: new FormControl(time ? time.hours : 0, Validators.required),
    minutes: new FormControl(time ? time.minutes : 0, Validators.required),
  })
  protected nextScheduleForm = new FormGroup({
    mondaySchedule: new FormGroup({
      startTime: new FormControl(this.timeForm(this.defaultTime), Validators.required),
      endTime: new FormControl(this.timeForm(this.defaultTime), Validators.required),
    }),

    tuesdaySchedule: new FormGroup({
      startTime: new FormControl(this.timeForm(this.defaultTime), Validators.required),
      endTime: new FormControl(this.timeForm(this.defaultTime), Validators.required),
    }),

    wednesdaySchedule: new FormGroup({
      startTime: new FormControl(this.timeForm(this.defaultTime), Validators.required),
      endTime: new FormControl(this.timeForm(this.defaultTime), Validators.required),
    }),

    thursdaySchedule: new FormGroup({
      startTime: new FormControl(this.timeForm(this.defaultTime), Validators.required),
      endTime: new FormControl(this.timeForm(this.defaultTime), Validators.required),
    }),

    fridaySchedule: new FormGroup({
      startTime: new FormControl(this.timeForm(this.defaultTime), Validators.required),
      endTime: new FormControl(this.timeForm(this.defaultTime), Validators.required),
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  updateNextSchedule(event: Event){
    const confirmation: Confirmation = {
      target: event.target as EventTarget,
      message: 'Are you sure you want to update this appointment?',
      accept: () => {
        let values = this.nextScheduleForm.value

        let nextWeek = new Date()
        nextWeek.setDate(nextWeek.getDate() + 7)
        let request: UpdateScheduleRequest = {
          doctorId: this.doctor.id,
          year: nextWeek.getFullYear(),
          weekNumber: DatesUtility.getWeekNumber(nextWeek),
          mondaySchedule: {
            startTime: values.mondaySchedule?.startTime as Time,
            endTime: values.mondaySchedule?.endTime as Time
          },
          tuesdaySchedule: {
            startTime: values.tuesdaySchedule?.startTime as Time,
            endTime: values.tuesdaySchedule?.endTime as Time
          },
          wednesdaySchedule: {
            startTime: values.wednesdaySchedule?.startTime as Time,
            endTime: values.wednesdaySchedule?.endTime as Time
          },
          thursdaySchedule: {
            startTime: values.thursdaySchedule?.startTime as Time,
            endTime: values.thursdaySchedule?.endTime as Time
          },
          fridaySchedule: {
            startTime: values.fridaySchedule?.startTime as Time,
            endTime: values.fridaySchedule?.endTime as Time
          }
        };
        console.log(request)
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
}
