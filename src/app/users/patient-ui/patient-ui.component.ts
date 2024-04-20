import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {User} from "../models/user.model";
import {MenuItem} from "primeng/api";
import {PatientUiStateService} from "../services/patient-ui-state.service";
import {Router} from "@angular/router";
import {Appointment} from "../../appointments/models/appointment.model";

@Component({
  selector: 'app-patient-ui',
  templateUrl: './patient-ui.component.html'
})
export class PatientUiComponent implements OnInit {
  private subscriptions = new Subscription()
  protected patient: User | null = null;
  protected menuItems: MenuItem[] | undefined;

  constructor(
    private stateService: PatientUiStateService,
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
      this.stateService.getUser(4).subscribe({
        next: (user: User) => {
          this.stateService.setPatient(user)
        },
        error: () => {
          this.stateService.setLoadingPatient(false)
        },
        complete: () => {
          this.stateService.setLoadingPatient(false)
        }
      })
    )

    this.subscriptions.add(
      this.stateService.getAppointments(4).subscribe({
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

    this.subscriptions.add(this.getPatient())
  }

  getPatient() {
    return this.stateService.state$.subscribe({
      next: (data) => {
        this.patient = data.patient
      },
      error: (error) => {
        this.stateService.setError(error)
      }
    })
  }

  // Menu Navigation

  selectPersonalDetails() {
    this.router.navigate([`/patient-ui/personal-details`])
  }

  selectChangePassword() {
    this.router.navigate([`/patient-ui/change-password`])
  }

  selectAppointmentList() {
    this.router.navigate([`/patient-ui/appointment-list`])
  }
}
