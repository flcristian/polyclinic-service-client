import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppointmentStateService} from "../services/appointment-state.service";
import {AppointmentService} from "../services/appointment.service";

import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-appointments-page',
  templateUrl: './appointments-page.component.html',
  styleUrl: './appointments-page.component.sass'
})
export class AppointmentsPageComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription()
  constructor(
    public appointmentService: AppointmentService,
    public appointmentState: AppointmentStateService,
    private router: Router
  ) { }

  ngOnInit(){
    this.subscriptions.add(
      this.appointmentService.getAppointments().subscribe({
        next:(appointments)=>{
          this.appointmentState.setAppointments(appointments)
        },
        error:(error)=>{
          this.appointmentState.setError(error)
        },
        complete:() => {
          this.appointmentState.setLoading(false)
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }


  log() {
    console.log("test")
  }

  navigateToAppointment(id: number) {
    this.router.navigate([`/appointment`, id])
  }

  navigateToAppointmentCreation() {
    this.router.navigate([`/create-appointment`])
  }
}
