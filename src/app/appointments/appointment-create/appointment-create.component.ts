import {Component, OnDestroy, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Confirmation, ConfirmationService} from "primeng/api";
import {Appointment} from "../models/appointment.model";
import {Router} from "@angular/router";
import {AppointmentStateService} from "../services/appointment-state.service";
import {AppointmentService} from "../services/appointment.service";
import {CreateAppointmentRequest} from "../models/create-appointment-request.model";
import {ConfirmPopup} from "primeng/confirmpopup";
import {CreateUserAppointmentRequest} from "../../user-appointments/models/create-user-appointment-request.model";
import {UserAppointmentService} from "../../user-appointments/services/user-appointment.service";
import {UserAppointmentStateService} from "../../user-appointments/services/user-appointment-state.service";
import {UserAppointment} from "../../user-appointments/models/user-appointment.model";
import {UserService} from "../../users/services/user.service";
import {UserStateService} from "../../users/services/user-state.service";
import {User} from "../../users/models/user.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html'
})
export class AppointmentCreateComponent implements OnDestroy {
  private subscriptions = new Subscription()
  protected patientId: number = 0
  protected patient: User | null = null
  protected doctorId: number = 0
  protected doctor: User | null = null
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  appointmentForm = new FormGroup({
    startDate: new FormControl(new Date(2024, 1), [
      Validators.required,
      this.dateValidator
    ]),
    endDate: new FormControl(new Date(2024, 1), [
      Validators.required,
      this.dateValidator
    ])
  });

  userIdsForm = new FormGroup({
    patientId: new FormControl(0, [
      Validators.required,
      Validators.min(1),
    ]),
    doctorId: new FormControl(0, [
      Validators.required,
      Validators.min(1),
    ])
  });

  constructor(
    public appointmentState: AppointmentStateService,
    public userState: UserStateService,
    public userAppointmentState: UserAppointmentStateService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  navigateToAppointments() {
    this.router.navigate(['/appointments'])
    this.appointmentState.setError(null)
  }

  createUserAppointment(request: CreateUserAppointmentRequest){
    this.userAppointmentState.createUserAppointment(request).subscribe({
      next: (userAppointment: UserAppointment) => {
        this.userAppointmentState.addUserAppointment(userAppointment)
      },
      error: (error) => {
        this.userAppointmentState.setError(error)
      },
      complete: () => {
        this.appointmentState.setLoading(false)
      }
    })
  }

  createAppointment(event: Event) {
    let request = this.appointmentForm.value as CreateAppointmentRequest;

    const confirmation: Confirmation = {
      target: event.target as EventTarget,
      message: 'Are you sure you want to create this appointment?',
      accept: () => {
        this.appointmentState.createAppointment(request).subscribe({
          next: (appointment: Appointment) => {
            this.appointmentState.addAppointment(appointment);

            let userAppointmentRequests: CreateUserAppointmentRequest[] = [
              {appointmentId: appointment.id, userId: this.userIdsForm.value.patientId as number},
              {appointmentId: appointment.id, userId: this.userIdsForm.value.doctorId as number}
            ]
            userAppointmentRequests.forEach(uar => {
              this.createUserAppointment(uar)
            })

            this.navigateToAppointments()
          },
          error: (error) => {
            this.appointmentState.setError(error)
          },
          complete: () => {
            this.appointmentState.setLoading(false)
          }
        })
      }
    };

    this.confirmationService.confirm(confirmation);
  }

  acceptCreate() {
    this.confirmPopup.accept()
  }

  rejectCreate() {
    this.confirmPopup.reject()
  }

  onPatientIdUpdate(){
    this.patientId = this.userIdsForm.value.patientId as number
    this.patient = null
    if(this.patientId > 0){
      this.subscriptions.add(
        this.userState.getUser(this.patientId).subscribe({
          next: (user: User) => {
            this.patient = user
          },
          error: (error) => {
            this.userState.setError(error)
          },
          complete: () => {
            this.userState.setLoading(false)
          }
        })
      )
    }
  }

  onDoctorIdUpdate(){
    this.doctorId = this.userIdsForm.value.doctorId as number
    this.doctor = null
    if(this.doctorId > 0){
      this.subscriptions.add(
        this.userState.getUser(this.doctorId).subscribe({
          next: (user: User) => {
            this.doctor = user
          },
          error: (error) => {
            this.userState.setError(error)
          },
          complete: () => {
            this.userState.setLoading(false)
          }
        })
      )
    }
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe()
  }

  validDates() {
    let dates: {startDate: Date, endDate: Date} = this.appointmentForm.value as {startDate: Date, endDate: Date};
    return dates.startDate < dates.endDate
  }

  datesEntered(){
    return this.appointmentForm.get('startDate')?.hasError('required') || this.appointmentForm.get('endDate')?.hasError('required')
  }

  // Validators

  private dateValidator(control: FormControl): { [s: string]: boolean } | null {
    let checkDate = new Date(2024, 1)
    let controlDate = new Date(control.value)
    if (
      checkDate.getFullYear() === controlDate.getFullYear() &&
      checkDate.getMonth() === controlDate.getMonth() &&
      checkDate.getDate() === controlDate.getDate() &&
      checkDate.getHours() === controlDate.getHours() &&
      checkDate.getMinutes() === controlDate.getMinutes() &&
      checkDate.getSeconds() === controlDate.getSeconds()
    ) return {'required': true};
    return null;
  }
}
