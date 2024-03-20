import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class UserScheduleTimesValidator {
  public static validateTimes(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      if(control.value) {
        if(control.value.startTime >= control.value.endTime) {
          return { "StartAfterEnd": true };
        }
      }
      return null;
    };
  }
}
