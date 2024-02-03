import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
  templateUrl: './appointment-view.component.html',
  styleUrl: './appointment-view.component.sass'
})
export class AppointmentViewComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  protected appointmentId: number = -1
  protected appointment: Appointment | null = null
  protected editAppointment: boolean = false;

  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  appointmentForm = new FormGroup({
    startDate: new FormControl(null, [
      Validators.required
    ]),
    endDate: new FormControl(null, [
      Validators.required
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
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['id'] ?? this.appointmentId
    })

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
      message: 'Are you sure you want to delete this item?',
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

  onSubmit() {
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
}
