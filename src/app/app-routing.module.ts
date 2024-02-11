import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppointmentListComponent} from "./appointments/appointment-list/appointment-list.component";
import {AppointmentSelectRouteComponent} from "./appointments/appointment-select-route/appointment-select-route.component";
import {AppointmentCreateComponent} from "./appointments/appointment-create/appointment-create.component";

const routes: Routes = [

  { path: '', redirectTo: '/appointments', pathMatch: 'full' },
  { path: 'appointments', component: AppointmentListComponent },
  { path: 'appointment/:id', component: AppointmentSelectRouteComponent },
  { path: 'create-appointment', component: AppointmentCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
