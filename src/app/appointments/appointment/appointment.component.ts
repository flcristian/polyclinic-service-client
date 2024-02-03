import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AppointmentService} from "../services/appointment.service";
import {AppointmentStateService} from "../services/appointment-state.service";
import {Appointment} from "../models/appointment.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.sass'
})
export class AppointmentComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  @Input() appointmentId: number = -1
  protected appointment: Appointment | null = null

  constructor(
    public appointmentService: AppointmentService,
    public appointmentState: AppointmentStateService,
  ) { }

  ngOnInit() {
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
