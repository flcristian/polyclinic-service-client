import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {User} from "../models/user.model";
import {DoctorUiStateService} from "../services/doctor-ui-state.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Confirmation, ConfirmationService} from "primeng/api";
import {UpdateUserRequest} from "../models/update-user-request.model";
import {ConfirmPopup} from "primeng/confirmpopup";
import {findLastMappingIndexBefore} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/source_file";

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html'
})
export class PersonalDetailsComponent implements OnInit {
  private subscriptions = new Subscription();
  protected editBase: boolean = false
  protected editContact: boolean = false
  protected doctor: User | null = null;
  protected genders = [
    {
      label: "Male",
      value: "Male"
    },
    {
      label: "Female",
      value: "Female"
    }
  ]
  private error: String | null = null;
  baseForm: FormGroup = new FormGroup({})

  contactForm: FormGroup = new FormGroup({})

  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  constructor(
    private stateService: DoctorUiStateService,
    private confirmationService : ConfirmationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscriptions.add(this.getDoctor())
  }

  getDoctor() {
    return this.stateService.state$.subscribe({
      next: (data) => {
        this.doctor = data.doctor
        this.error = data.error

        this.baseForm = new FormGroup({
          name: new FormControl(this.doctor?.name, [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(128)
          ]),
          age: new FormControl(this.doctor?.age, [
            Validators.required,
            Validators.min(0)
          ]),
          gender: new FormControl('Female')
        },)

        this.contactForm = new FormGroup({
          email: new FormControl(this.doctor?.email, [
            Validators.required,
            Validators.email
          ]),
          phone: new FormControl(this.doctor?.phone, [
            Validators.required
          ])
        })
      },
      error: (error) => {
        this.stateService.setError(error)
      }
    })
  }

  // Form Confirmations

  updateDoctor(event: Event){
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
        }

        this.stateService.updateUser(request)
      }
    };

    this.confirmationService.confirm(confirmation);
  }

  acceptUpdate(){
    this.confirmPopup.accept()
  }

  rejectUpdate() {
    this.confirmPopup.reject()
  }
}
