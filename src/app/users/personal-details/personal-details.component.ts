import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";
import { User } from "../models/user.model";
import { DoctorUiStateService } from "../services/doctor-ui-state.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Confirmation, ConfirmationService } from "primeng/api";
import { UpdateUserRequest } from "../models/update-user-request.model";
import { ConfirmPopup } from "primeng/confirmpopup";

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html'
})
export class PersonalDetailsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  protected editBase: boolean = false;
  protected editContact: boolean = false;
  protected doctor: User | null = null;
  protected genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" }
  ];
  private error: String | null = null;
  baseForm: FormGroup = new FormGroup({});
  contactForm: FormGroup = new FormGroup({});
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  constructor(
    private stateService: DoctorUiStateService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initializeForms();
    this.subscriptions.add(this.getDoctor());
  }

  initializeForms() {
    this.baseForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
      gender: new FormControl('Male')
    },{updateOn:'change'});

    this.contactForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl('', [
        Validators.required
      ])
    },{updateOn:'change'});
  }

  getDoctor() {
    return this.stateService.state$.subscribe({
      next: (data) => {
        this.doctor = data.doctor;
        this.error = data.error;
        if (this.doctor) {
          this.populateForms(this.doctor);
        }
      },
      error: (error) => {
        this.stateService.setError(error);
      }
    });
  }

  populateForms(doctor: User) {
    this.baseForm.patchValue({
      name: doctor.name,
      age: doctor.age,
      gender: doctor.gender
    });

    this.contactForm.patchValue({
      email: doctor.email,
      phone: doctor.phone
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  updateDoctor(event: Event) {
    const confirmation: Confirmation = {
      target: event.target as EventTarget,
      message: 'Are you sure you want to update your details?',
      accept: () => {
        let request: UpdateUserRequest = {
          id: this.doctor?.id as number,
          name: this.baseForm.value.name as string,
          age: this.baseForm.value.age as number,
          gender: this.baseForm.value.gender as string,
          email: this.contactForm.value.email as string,
          phone: this.contactForm.value.phone as string,
          password: this.doctor?.password as string,
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
