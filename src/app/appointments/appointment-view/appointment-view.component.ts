import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Appointment} from "../models/appointment.model";
import {AppointmentService} from "../services/appointment.service";
import {AppointmentStateService} from "../services/appointment-state.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UpdateAppointmentRequest} from "../models/update-appointment-request.model";
import {Confirmation, ConfirmationService} from "primeng/api";
import {ConfirmPopup} from "primeng/confirmpopup";

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html'
})
export class AppointmentViewComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  @Input() appointmentId: number = -1
  protected appointment: Appointment | null = null
  protected editAppointment: boolean = false;
  protected seeUsers: boolean = false;
  protected showBackButton: boolean = true;

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

  constructor(
    public appointmentService: AppointmentService,
    public appointmentState: AppointmentStateService,
    public confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(this.appointmentId === -1){
      this.route.params.subscribe((params: Params) => {
        this.appointmentId = params['id'] ?? this.appointmentId
      })
    }
    else{
      this.showBackButton = false;
    }

    this.subscriptions.add(
      this.appointmentService.getAppointment(this.appointmentId).subscribe({
        next: (appointment) => {
          this.appointment = appointment
        },
        error: (error) => {
          this.appointmentState.setError(error)
        },
        complete: () => {
          this.appointmentState.setLoading(false)
        }
      })
    )
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe()
  }

  navigateToAppointments() {
    this.router.navigate(['/appointments'])
    this.appointmentState.setError(null)
  }

  deleteAppointment(event: Event) {
    const confirmation: Confirmation = {
      target: event.target as EventTarget,
      message: 'Are you sure you want to cancel this appointment?',
      accept: () => {
        if(this.appointment){
          this.appointmentService.deleteAppointment(this.appointment.id).subscribe({
            next: (appointment: Appointment) => {
              this.appointmentState.deleteAppointment(appointment);
              this.navigateToAppointments()
            },
            error: (error) => {
              this.appointmentState.setError(error)
            }
          })
        }
      }
    };

    this.confirmationService.confirm(confirmation);
  }

  acceptDelete(){
    this.confirmPopup.accept()
  }

  rejectDelete() {
    this.confirmPopup.reject()
  }

  updateAppointment(event: Event){
    const confirmation: Confirmation = {
      target: event.target as EventTarget,
      message: 'Are you sure you want to update this appointment?',
      accept: () => {
        let request = this.appointmentForm.value as UpdateAppointmentRequest;
        request.id = this.appointmentId;

        this.appointmentService.updateAppointment(request).subscribe({
          next: (appointment: Appointment) => {
            this.appointmentState.addAppointment(appointment)
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

  acceptUpdate(){
    this.confirmPopup.accept()
  }

  rejectUpdate() {
    this.confirmPopup.reject()
  }

  validDates() {
    let dates: {startDate: Date, endDate: Date} = this.appointmentForm.value as {startDate: Date, endDate: Date};
    return dates.startDate < dates.endDate
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
