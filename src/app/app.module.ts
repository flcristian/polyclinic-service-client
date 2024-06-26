import  { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {TableModule} from "primeng/table";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MessageModule} from "primeng/message";
import {RippleModule} from "primeng/ripple";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {HttpErrorInterceptor} from "./interceptors/http-error.interceptor";
import {AppointmentListComponent} from "./appointments/appointment-list/appointment-list.component";
import {AppointmentComponent} from "./appointments/appointment/appointment.component";
import { UserComponent } from './users/user/user.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AppointmentSelectRouteComponent } from './appointments/appointment-select-route/appointment-select-route.component';
import {ToggleButtonModule} from "primeng/togglebutton";
import { AppointmentCreateComponent } from './appointments/appointment-create/appointment-create.component';
import {ConfirmPopupModule} from "primeng/confirmpopup";
import { LocaleDateStringPipe } from './pipes/custom-date/locale-date-string.pipe';
import {
  AppointmentSelectSubjectComponent
} from "./appointments/appointment-select-subject/appointment-select-subject.component";
import { DoctorUiComponent } from './users/doctor-ui/doctor-ui.component';
import {MenuModule} from "primeng/menu";
import { DoctorPersonalDetailsComponent } from './users/doctor-personal-details/doctor-personal-details.component';
import { UserScheduleComponent } from './users/user-schedule/user-schedule.component';
import { DoctorChangePasswordComponent } from './users/doctor-change-password/doctor-change-password.component';
import {CascadeSelectModule} from "primeng/cascadeselect";
import {DropdownModule} from "primeng/dropdown";
import {TimeStringPipe} from "./pipes/custom-date/time-string.pipe";
import {CalendarModule} from "primeng/calendar";
import { CapitalizePipe } from './pipes/strings/capitalize.pipe';
import { DoctorAppointmentsComponent } from './user-appointments/doctor-appointments/doctor-appointments.component';
import { DoctorAppointmentPreviewComponent } from './users/doctor-appointment-preview/doctor-appointment-preview.component';
import { PatientUiComponent } from './users/patient-ui/patient-ui.component';
import { PatientAppointmentsComponent } from './user-appointments/patient-appointments/patient-appointments.component';
import {
  PatientAppointmentPreviewComponent
} from "./users/patient-appointment-preview/patient-appointment-preview.component";
import { PatientChangePasswordComponent } from './users/patient-change-password/patient-change-password.component';
import { PatientPersonalDetailsComponent } from './users/patient-personal-details/patient-personal-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentListComponent,
    AppointmentComponent,
    UserComponent,
    AppointmentSelectRouteComponent,
    AppointmentSelectSubjectComponent,
    AppointmentCreateComponent,
    LocaleDateStringPipe,
    TimeStringPipe,
    DoctorUiComponent,
    DoctorPersonalDetailsComponent,
    UserScheduleComponent,
    DoctorChangePasswordComponent,
    CapitalizePipe,
    DoctorAppointmentsComponent,
    DoctorAppointmentsComponent,
    DoctorAppointmentPreviewComponent,
    PatientUiComponent,
    PatientAppointmentsComponent,
    PatientAppointmentPreviewComponent,
    PatientChangePasswordComponent,
    PatientPersonalDetailsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ProgressSpinnerModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ButtonModule,
        ProgressSpinnerModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        RippleModule,
        MessageModule,
        MessagesModule,
        ToastModule,
        TableModule,
        ToggleButtonModule,
        ConfirmPopupModule,
        MenuModule,
        CascadeSelectModule,
        DropdownModule,
        CalendarModule
    ],
  providers: [
    ConfirmationService,
    MessageService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HttpErrorInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
