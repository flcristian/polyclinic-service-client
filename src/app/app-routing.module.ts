import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppointmentsPageComponent} from "./appointments/appointments-page/appointments-page.component";
import {AppointmentViewComponent} from "./appointments/appointment-view/appointment-view.component";
import {AppointmentCreateComponent} from "./appointments/appointment-create/appointment-create.component";

const routes: Routes = [

  { path: '', redirectTo: '/appointments', pathMatch: 'full' },
  { path: 'appointments', component: AppointmentsPageComponent },
  { path: 'appointment/:id', component: AppointmentViewComponent },
  { path: 'create-appointment', component: AppointmentCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
