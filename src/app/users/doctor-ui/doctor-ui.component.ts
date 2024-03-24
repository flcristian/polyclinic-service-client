import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {User} from "../models/user.model";
import {DoctorUiStateService} from "../services/doctor-ui-state.service";
import {Subscription} from "rxjs";
import {Schedule} from "../../schedules/models/schedule.model";
import {Appointment} from "../../appointments/models/appointment.model";

@Component({
  selector: 'app-doctor-ui',
  templateUrl: './doctor-ui.component.html'
})
export class DoctorUiComponent implements OnInit {
  private subscriptions = new Subscription()
  protected doctor: User | null = null;
  protected menuItems: MenuItem[] | undefined;

  constructor(
    private stateService: DoctorUiStateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.menuItems = [
      {
        label: "User Settings",
        items: [
          {
            label: 'Personal Details',
            icon: 'pi pi-user-edit',
            command: () => {
              this.selectPersonalDetails()
            }
          },
          {
            label: 'Schedule',
            icon: 'pi pi-calendar',
            command: () => {
              this.selectSchedule()
            }
          }
          ,
          {
            label: 'Change Password',
            icon: 'pi pi-lock',
            command: () => {
              this.selectChangePassword()
            }
          }
        ]
      },
      {
        label: "Appointments",
        items: [
          {
            label: 'Appointment List',
            icon: 'pi pi-list',
            command: () => {
              this.selectAppointmentList()
            }
          }
        ]
      },
      {
        label: "Other",
        items: [
          {
            label: 'Sign Out',
            icon: 'pi pi-sign-out'
          }
        ]
      }
    ]

    this.subscriptions.add(
      this.stateService.getUser(3).subscribe({
        next: (user: User) => {
          this.stateService.setDoctor(user)
        },
        error: () => {
          this.stateService.setLoadingDoctor(false)
        },
        complete: () => {
          this.stateService.setLoadingDoctor(false)
        }
      })
    )

    this.subscriptions.add(
      this.stateService.getAppointments(3).subscribe({
        next: (appointments: Appointment[]) => {
          this.stateService.setAppointments(appointments)
        },
        error: () => {
          this.stateService.setLoadingAppontments(false)
        },
        complete: () => {
          this.stateService.setLoadingAppontments(false)
        }
      })
    )

    let today = new Date()
    this.subscriptions.add(
      this.stateService.getSchedule(3, today).subscribe({
        next: (schedule: Schedule) => {
          this.stateService.setSchedule(schedule)
        },
        error: (error) => {
          this.stateService.setLoadingSchedule(false)
        },
        complete: () => {
          this.stateService.setLoadingSchedule(false)
        }
      })
    )

    today.setDate(today.getDate() + 7)
    this.subscriptions.add(
      this.stateService.getNextSchedule(3, today).subscribe({
        next: (nextSchedule: Schedule) => {
          this.stateService.setNextSchedule(nextSchedule)
        },
        error: (error) => {
          this.stateService.setLoadingNextSchedule(false)
        },
        complete: () => {
          this.stateService.setLoadingNextSchedule(false)
        }
      })
    )

    this.subscriptions.add(this.getDoctor())
  }

  getDoctor() {
    return this.stateService.state$.subscribe({
      next: (data) => {
        this.doctor = data.doctor
      },
      error: (error) => {
        this.stateService.setError(error)
      }
    })
  }

  // Menu Navigation

  selectPersonalDetails() {
    this.router.navigate([`/doctor-ui/personal-details`])
  }

  selectSchedule() {
    this.router.navigate([`/doctor-ui/user-schedule`])
  }

  selectChangePassword() {
    this.router.navigate([`/doctor-ui/change-password`])
  }

  selectAppointmentList() {
    this.router.navigate([`/doctor-ui/appointment-list`])
  }
}
