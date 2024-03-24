import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Appointment} from "../../appointments/models/appointment.model";
import {AppointmentStateService} from "../../appointments/services/appointment-state.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserAppointment} from "../../user-appointments/models/user-appointment.model";
import {DoctorUiStateService} from "../services/doctor-ui-state.service";
import {User} from "../models/user.model";

@Component({
  selector: 'app-doctor-appointment-preview',
  templateUrl: './doctor-appointment-preview.component.html'
})
export class DoctorAppointmentPreviewComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  protected appointmentId: number = -1
  protected appointment: Appointment | null = null
  protected doctor: User | null = null;

  constructor(
    public appointmentState: AppointmentStateService,
    private doctorState: DoctorUiStateService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['id']
    })

    this.subscriptions.add(
      this.appointmentState.getAppointment(this.appointmentId).subscribe({
        next: (appointment) => {
          this.appointment = appointment
          this.appointmentState.setSelectedAppointment(appointment)
        },
        error: (error) => {
          this.appointmentState.setError(error)
        },
        complete:() => {
          this.appointmentState.setLoading(false)
        }
      })
    )

    this.subscriptions.add(this.getDoctor())
  }

  private getDoctor() {
    return this.doctorState.state$.subscribe({
      next: (data) => {
        this.doctor = data.doctor;
      },
      error: (error) => {
        this.doctorState.setError(error);
      }
    });
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe()
  }

  navigateToAppointments() {
    this.router.navigate(['/doctor-ui/appointment-list'])
  }

  getPatient(userAppointments: UserAppointment[]): User {
    return userAppointments.find((ua): ua is UserAppointment => ua.user.id !== this.doctor!.id)!.user;
  }
}
