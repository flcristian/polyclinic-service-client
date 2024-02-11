import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Appointment} from "../models/appointment.model";
import {AppointmentStateService} from "../services/appointment-state.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UpdateAppointmentRequest} from "../models/update-appointment-request.model";
import {Confirmation, ConfirmationService} from "primeng/api";
import {ConfirmPopup} from "primeng/confirmpopup";
@Component({
  selector: 'app-appointment-select-subject',
  templateUrl: './appointment-select-subject.component.html'
})
export class AppointmentSelectSubjectComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  protected appointment: Appointment | null = null
  protected editAppointment: boolean = false;
  protected seeUsers: boolean = false;

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
    public appointmentState: AppointmentStateService,
    public confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscriptions.add(
      this.appointmentState.state$.subscribe({
        next: (state) => {
          this.appointment = state.selectedAppointment
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

  ngOnDestroy() {
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
          this.subscriptions.add(
            this.appointmentState.deleteAppointment(this.appointment.id).subscribe({
              next: (appointment: Appointment) => {
                this.appointmentState.removeAppointment(appointment);
                this.navigateToAppointments()
              },
              error: (error) => {
                this.appointmentState.setError(error)
              },
              complete:() => {
                this.appointmentState.setLoading(false)
              }
            })
          )
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
        request.id = (this.appointment as Appointment).id;

        this.subscriptions.add(
          this.appointmentState.updateAppointment(request).subscribe({
            next: (appointment) => {
              this.appointmentState.editAppointment(appointment)
              this.navigateToAppointments()
            },
            error: (error) => {
              this.appointmentState.setError(error)
            },
            complete:() => {
              this.appointmentState.setLoading(false)
            }
          })
        )
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
