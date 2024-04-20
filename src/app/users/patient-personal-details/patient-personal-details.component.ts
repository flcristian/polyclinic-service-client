import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";
import { User } from "../models/user.model";
import { PatientUiStateService } from "../services/patient-ui-state.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Confirmation, ConfirmationService } from "primeng/api";
import { UpdateUserRequest } from "../models/update-user-request.model";
import { ConfirmPopup } from "primeng/confirmpopup";

@Component({
  selector: 'app-patient-personal-details',
  templateUrl: './patient-personal-details.component.html'
})
export class PatientPersonalDetailsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  protected editBase: boolean = false;
  protected editContact: boolean = false;
  protected patient: User | null = null;
  protected genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" }
  ];
  private error: String | null = null;
  baseForm: FormGroup = new FormGroup({});
  contactForm: FormGroup = new FormGroup({});
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  constructor(
    private stateService: PatientUiStateService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initializeForms();
    this.subscriptions.add(this.getPatient());
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

  getPatient() {
    return this.stateService.state$.subscribe({
      next: (data) => {
        this.patient = data.patient;
        this.error = data.error;
        if (this.patient) {
          this.populateForms(this.patient);
        }
      },
      error: (error) => {
        this.stateService.setError(error);
      }
    });
  }

  populateForms(patient: User) {
    this.baseForm.patchValue({
      name: patient.name,
      age: patient.age,
      gender: patient.gender
    });

    this.contactForm.patchValue({
      email: patient.email,
      phone: patient.phone
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  updatePatient(event: Event) {
    const confirmation: Confirmation = {
      target: event.target as EventTarget,
      message: 'Are you sure you want to update your details?',
      accept: () => {
        let request: UpdateUserRequest = {
          id: this.patient?.id as number,
          name: this.baseForm.value.name as string,
          age: this.baseForm.value.age as number,
          gender: this.baseForm.value.gender as string,
          email: this.contactForm.value.email as string,
          phone: this.contactForm.value.phone as string,
          password: this.patient?.password as string,
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
