import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppointmentListComponent} from "./appointments/appointment-list/appointment-list.component";
import {AppointmentSelectRouteComponent} from "./appointments/appointment-select-route/appointment-select-route.component";
import {AppointmentCreateComponent} from "./appointments/appointment-create/appointment-create.component";
import {DoctorUiComponent} from "./users/doctor-ui/doctor-ui.component";
import {DoctorPersonalDetailsComponent} from "./users/doctor-personal-details/doctor-personal-details.component";
import {UserScheduleComponent} from "./users/user-schedule/user-schedule.component";
import {DoctorChangePasswordComponent} from "./users/doctor-change-password/doctor-change-password.component";
import {DoctorAppointmentsComponent} from "./user-appointments/doctor-appointments/doctor-appointments.component";
import {
  DoctorAppointmentPreviewComponent
} from "./users/doctor-appointment-preview/doctor-appointment-preview.component";
import {
  PatientAppointmentPreviewComponent
} from "./users/patient-appointment-preview/patient-appointment-preview.component";
import {PatientAppointmentsComponent} from "./user-appointments/patient-appointments/patient-appointments.component";
import {PatientUiComponent} from "./users/patient-ui/patient-ui.component";
import {PatientChangePasswordComponent} from "./users/patient-change-password/patient-change-password.component";
import {PatientPersonalDetailsComponent} from "./users/patient-personal-details/patient-personal-details.component";

const routes: Routes = [
  { path: '', redirectTo: '/patient-ui', pathMatch: 'full' },
  {
    path : 'doctor-ui',
    component: DoctorUiComponent,
    children: [
      { path: 'personal-details', component: DoctorPersonalDetailsComponent },
      { path: 'user-schedule', component: UserScheduleComponent },
      { path: 'change-password', component: DoctorChangePasswordComponent },
      { path: 'appointment-list', component: DoctorAppointmentsComponent },
      { path: 'appointment/:id', component: DoctorAppointmentPreviewComponent }
    ]
  },
  {
    path : 'patient-ui',
    component: PatientUiComponent,
    children: [
      { path: 'personal-details', component: PatientPersonalDetailsComponent },
      { path: 'change-password', component: PatientChangePasswordComponent },
      { path: 'appointment-list', component: PatientAppointmentsComponent },
      { path: 'appointment/:id', component: PatientAppointmentPreviewComponent }
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
