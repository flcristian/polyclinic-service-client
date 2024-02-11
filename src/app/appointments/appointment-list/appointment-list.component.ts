import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import {AppointmentStateService} from "../services/appointment-state.service";
import {AppointmentService} from "../services/appointment.service";

import {mergeScan, Subject, Subscription, throwError} from "rxjs";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html'
})
export class AppointmentListComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()

  protected wideScreen = window.innerWidth > 800

  // Filtering
  protected filters: boolean = false
  protected startDate: Date | null = null
  protected endDate: Date | null = null

  constructor(
    public appointmentService: AppointmentService,
    public appointmentState: AppointmentStateService,
    private router: Router,
    private messageService: MessageService
  ) { }

  // Interfaces

  ngOnInit(){
    this.subscriptions.add(
      this.getAllAppointments()
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  // Filter methods

  onClickFilters() {
    if(!this.filters){
      this.clearFilters()
    }
  }

  clearFilters() {
    this.subscriptions.add(
      this.getAllAppointments()
    )
  }

  applyFilters(){
    if(!this.startDate || !this.endDate){
      let message = 'You must enter the filter values first!'
      this.messageService.add({
        severity: 'info',
        detail: message,
        sticky: false
      })
      return
    }
    else if(this.startDate >= this.endDate){
      let message = 'Start date must be before the end date!'
      this.messageService.add({
        severity: 'info',
        detail: message,
        sticky: false
      })
      return
    }
    else {
      this.subscriptions.add(
        this.getFilteredAppointments(this.startDate, this.endDate)
      )
    }
  }

  private getAllAppointments(): Subscription{
    return this.appointmentState.getAppointments().subscribe({
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
  }

  private getFilteredAppointments(startDate: Date, endDate: Date): Subscription{
    return this.appointmentService.getFilteredAppointments(startDate, endDate).subscribe({
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
  }

  // Navigation

  navigateToAppointment(id: number) {
    this.appointmentState.getAppointment(id).subscribe({
      next: (appointment) => {
        this.appointmentState.setSelectedAppointment(appointment)
      },
      error: (error) => {
        this.appointmentState.setError(error)
      },
      complete: () => {
        this.appointmentState.setLoading(false)
      }
    })
    //this.router.navigate([`/appointment`, id])
  }

  navigateToAppointmentCreation() {
    this.router.navigate([`/create-appointment`])
  }
}
