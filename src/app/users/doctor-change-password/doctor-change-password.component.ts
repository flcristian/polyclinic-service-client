import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {User} from "../models/user.model";
import {DoctorUiStateService} from "../services/doctor-ui-state.service";
import {Confirmation, ConfirmationService} from "primeng/api";
import {UpdateUserRequest} from "../models/update-user-request.model";
import {ConfirmPopup} from "primeng/confirmpopup";

@Component({
  selector: 'app-doctor-change-password',
  templateUrl: './doctor-change-password.component.html'
})
export class DoctorChangePasswordComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  protected doctor: User | null = null;
  protected passwordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(128)
    ])
  });
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  constructor(
    private stateService: DoctorUiStateService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.subscriptions.add(this.getDoctor())
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  getDoctor() {
    return this.stateService.state$.subscribe({
      next: (data) => {
        this.doctor = data.doctor;
      },
      error: (error) => {
        this.stateService.setError(error);
      }
    });
  }

  updateDoctor(event: Event) {
    const confirmation: Confirmation = {
      target: event.target as EventTarget,
      message: 'Are you sure you want to update your details?',
      accept: () => {
        let request: UpdateUserRequest = {
          id: this.doctor?.id as number,
          name: this.doctor?.name as string,
          age: this.doctor?.age as number,
          gender: this.doctor?.gender as string,
          email: this.doctor?.email as string,
          phone: this.doctor?.phone as string,
          password: this.passwordForm.value.password as string,
          type: this.doctor?.type as number
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
