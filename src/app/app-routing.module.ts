import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppointmentsPageComponent} from "./appointments/appointments-page/appointments-page.component";
import {AppointmentComponent} from "./appointments/appointment/appointment.component";

const routes: Routes = [

  { path: '', redirectTo: '/appointments', pathMatch: 'full' },
  { path: 'appointments', component: AppointmentsPageComponent },
  { path: 'appointment/:id', component: AppointmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
