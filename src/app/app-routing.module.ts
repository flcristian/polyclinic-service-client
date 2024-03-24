import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppointmentListComponent} from "./appointments/appointment-list/appointment-list.component";
import {AppointmentSelectRouteComponent} from "./appointments/appointment-select-route/appointment-select-route.component";
import {AppointmentCreateComponent} from "./appointments/appointment-create/appointment-create.component";
import {DoctorUiComponent} from "./users/doctor-ui/doctor-ui.component";
import {PersonalDetailsComponent} from "./users/personal-details/personal-details.component";
import {UserScheduleComponent} from "./users/user-schedule/user-schedule.component";
import {ChangePasswordComponent} from "./users/change-password/change-password.component";
import {DoctorAppointmentsComponent} from "./user-appointments/doctor-appointments/doctor-appointments.component";

const routes: Routes = [
  { path: '', redirectTo: '/doctor-ui', pathMatch: 'full' },
  {
    path : 'doctor-ui',
    component: DoctorUiComponent,
    children: [
      { path: 'personal-details', component: PersonalDetailsComponent },
      { path: 'user-schedule', component: UserScheduleComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'appointment-list', component: DoctorAppointmentsComponent }
    ]
  },
  { path: 'appointments', component: AppointmentListComponent },
  { path: 'appointment/:id', component: AppointmentSelectRouteComponent },
  { path: 'create-appointment', component: AppointmentCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
