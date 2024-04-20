import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Appointment} from "../../appointments/models/appointment.model";
import {AppointmentStateService} from "../../appointments/services/appointment-state.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserAppointment} from "../../user-appointments/models/user-appointment.model";
import {PatientUiStateService} from "../services/patient-ui-state.service";
import {User} from "../models/user.model";

@Component({
  selector: 'app-patient-appointment-preview',
  templateUrl: './patient-appointment-preview.component.html'
})
export class PatientAppointmentPreviewComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  protected appointmentId: number = -1
  protected appointment: Appointment | null = null
  protected patient: User | null = null;

  constructor(
    public appointmentState: AppointmentStateService,
    private patientState: PatientUiStateService,
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

    this.subscriptions.add(this.getPatient())
  }

  private getPatient() {
    return this.patientState.state$.subscribe({
      next: (data) => {
        this.patient = data.patient;
      },
      error: (error) => {
        this.patientState.setError(error);
      }
    });
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe()
  }

  navigateToAppointments() {
    this.router.navigate(['/patient-ui/appointment-list'])
  }

  getDoctor(userAppointments: UserAppointment[]): User {
    return userAppointments.find((ua): ua is UserAppointment => ua.user.id !== this.patient!.id)!.user;
  }
}
