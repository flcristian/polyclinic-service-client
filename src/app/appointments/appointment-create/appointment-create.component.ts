import {Component, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrl: './appointment-create.component.sass'
})
export class AppointmentCreateComponent {
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  appointmentForm = new FormGroup({
    startDate: new FormControl(null, [
      Validators.required
    ]),
    endDate: new FormControl(null, [
      Validators.required
    ])
  });

  userIdsForm = new FormGroup({
    patientId: new FormControl(null, [
      Validators.required,
      Validators.min(1)
    ]),
    doctorId: new FormControl(null, [
      Validators.required,
      Validators.min(1)
    ])
  });

  constructor(
    public appointmentService: AppointmentService,
    public appointmentState: AppointmentStateService,
    public userAppointmentService: UserAppointmentService,
    public userAppointmentState: UserAppointmentStateService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  navigateToAppointments() {
    this.router.navigate(['/appointments'])
    this.appointmentState.setError(null)
  }

  createUserAppointment(request: CreateUserAppointmentRequest){
    this.userAppointmentService.createUserAppointment(request).subscribe({
      next: (userAppointment: UserAppointment) => {
        this.userAppointmentState.addUserAppointment(userAppointment)
      },
      error: (error) => {
        this.userAppointmentState.setError(error)
      }
    })
  }

  createAppointment(event: Event) {
    let request = this.appointmentForm.value as CreateAppointmentRequest;

    const confirmation: Confirmation = {
      target: event.target as EventTarget,
      message: 'Are you sure you want to create this appointment?',
      accept: () => {
        this.appointmentService.createAppointment(request).subscribe({
          next: (appointment: Appointment) => {
            this.appointmentState.addAppointment(appointment);

            let patientAppointmentRequest: CreateUserAppointmentRequest = {appointmentId: appointment.id, userId: this.userIdsForm.value.patientId};

            this.navigateToAppointments()
          },
          error: (error) => {
            this.appointmentState.setError(error)
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
}
