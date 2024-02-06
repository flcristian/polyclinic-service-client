import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppointmentListComponent} from "./appointments/appointment-list/appointment-list.component";
import {AppointmentViewComponent} from "./appointments/appointment-view/appointment-view.component";
import {AppointmentCreateComponent} from "./appointments/appointment-create/appointment-create.component";

const routes: Routes = [

  { path: '', redirectTo: '/appointments', pathMatch: 'full' },
  { path: 'appointments', component: AppointmentListComponent },
  { path: 'appointment/:id', component: AppointmentViewComponent },
  { path: 'create-appointment', component: AppointmentCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
