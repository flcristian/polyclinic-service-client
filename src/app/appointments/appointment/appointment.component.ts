import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AppointmentService} from "../services/appointment.service";
import {AppointmentStateService} from "../services/appointment-state.service";
import {Appointment} from "../models/appointment.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html'
})
export class AppointmentComponent {
  @Input() appointment: Appointment | null = null

  constructor() { }
}
