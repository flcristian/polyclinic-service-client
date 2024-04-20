import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {User} from "../models/user.model";
import {PatientUiStateService} from "../services/patient-ui-state.service";
import {Confirmation, ConfirmationService} from "primeng/api";
import {UpdateUserRequest} from "../models/update-user-request.model";
import {ConfirmPopup} from "primeng/confirmpopup";

@Component({
  selector: 'app-patient-change-password',
  templateUrl: './patient-change-password.component.html'
})
export class PatientChangePasswordComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  protected patient: User | null = null;
  protected passwordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(128)
    ])
  });
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  constructor(
    private stateService: PatientUiStateService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.subscriptions.add(this.getPatient())
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  getPatient() {
    return this.stateService.state$.subscribe({
      next: (data) => {
        this.patient = data.patient;
      },
      error: (error) => {
        this.stateService.setError(error);
      }
    });
  }

  updatePatient(event: Event) {
    const confirmation: Confirmation = {
      target: event.target as EventTarget,
      message: 'Are you sure you want to update your details?',
      accept: () => {
        let request: UpdateUserRequest = {
          id: this.patient?.id as number,
          name: this.patient?.name as string,
          age: this.patient?.age as number,
          gender: this.patient?.gender as string,
          email: this.patient?.email as string,
          phone: this.patient?.phone as string,
          password: this.passwordForm.value.password as string,
          type: this.patient?.type as number
        };

        this.stateService.updateUser(request);
      }
    };

    this.confirmationService.confirm(confirmation);
  }

  acceptUpdate() {
    this.confirmPopup.accept();
  }

  rejectUpdate() {
    this.confirmPopup.reject();
  }
}
