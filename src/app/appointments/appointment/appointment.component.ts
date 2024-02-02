import {Component, OnInit} from '@angular/core';
import {AppointmentService} from "../services/appointment.service";
import {AppointmentStateService} from "../services/appointment-state.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Appointment} from "../models/appointment.model";
import {UserAppointment} from "../../user-appointments/models/user-appointment.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.sass'
})
export class AppointmentComponent implements OnInit {
  private subscriptions = new Subscription()
  private appointmentId: number = -1
  protected appointment: Appointment | null = null
  protected userIds: number[] = []

  constructor(
    public appointmentService: AppointmentService,
    public appointmentState: AppointmentStateService,
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

  deleteAppointment() {
    this.appointmentService.deleteAppointment(this.appointment)({
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
