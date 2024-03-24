import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Subscription} from "rxjs";
import {DoctorUiStateService} from "../../users/services/doctor-ui-state.service";
import {User} from "../../users/models/user.model";

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html'
})
export class DoctorAppointmentsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  private doctor: User | null = null;

  protected filters: boolean = false
  protected startDate: Date | null = null
  protected endDate: Date | null = null

  constructor(
    public stateService: DoctorUiStateService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(){
    this.subscriptions.add(
      this.getDoctor()
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  private getDoctor() {
    return this.stateService.state$.subscribe({
      next: (data) => {
        this.doctor = data.doctor;
      },
      error: (error) => {
        this.stateService.setError(error);
      }
    });
  }

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
    return this.stateService.getAppointments(this.doctor!.id).subscribe({
      next:(appointments)=>{
        this.stateService.setAppointments(appointments)
      },
      error:(error)=>{
        this.stateService.setError(error)
      },
      complete:() => {
        this.stateService.setLoadingAppontments(false)
      }
    })
  }

  private navigateToAppointment(id: number){
    
  }

  private getFilteredAppointments(startDate: Date, endDate: Date): Subscription{
    return this.stateService.getFilteredAppointments(this.doctor!.id, startDate, endDate).subscribe({
      next:(appointments)=>{
        this.stateService.setAppointments(appointments)
      },
      error:(error)=>{
        this.stateService.setError(error)
      },
      complete:() => {
        this.stateService.setLoadingAppontments(false)
      }
    })
  }
}
