import { NgModule } from '@angular/core';
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
import {AppointmentsPageComponent} from "./appointments/appointments-page/appointments-page.component";
import {AppointmentComponent} from "./appointments/appointment/appointment.component";
import { UserComponent } from './users/user/user.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AppointmentViewComponent } from './appointments/appointment-view/appointment-view.component';
import {ToggleButtonModule} from "primeng/togglebutton";
import { AppointmentCreateComponent } from './appointments/appointment-create/appointment-create.component';
import {ConfirmPopupModule} from "primeng/confirmpopup";

@NgModule({
  declarations: [
    AppComponent,
    AppointmentsPageComponent,
    AppointmentComponent,
    UserComponent,
    AppointmentViewComponent,
    AppointmentCreateComponent
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
    ConfirmPopupModule
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
