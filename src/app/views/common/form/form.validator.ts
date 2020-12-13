import {
  ValidationErrors,
  AbstractControl,
  AsyncValidatorFn,
  FormGroup,
  NG_ASYNC_VALIDATORS,
  AsyncValidator,
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

export class FormValidator {
  static valueExist(service: any, model: string): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);
      return of(null);
      const input = { [FormValidator.getName(control)]: control.value };
      return service.getOne(input).pipe(
        tap(({ data }) => {
          console.log(data[model]);
          //If its not and update of the same element
          if (
            data[model] &&
            data[model]._id != null &&
            control.parent.value._id != data[model]._id
          ) {
            control.setErrors({ exist: true });
            return { exist: true };
          } else return null;
        })
      );
    };
  }
  static getName(control: AbstractControl): string | null {
    let group = <FormGroup>control.parent;
    if (!group) {
      return null;
    }

    let name: string;

    Object.keys(group.controls).forEach((key) => {
      let childControl = group.get(key);

      if (childControl !== control) {
        return;
      }

      name = key;
    });

    return name;
  }
}

/*
export class CustomEmailValidator {
  constructor(private userService: UserService) {}

  existingEmailValidator(initialEmail: string = ""): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<{ [key: string]: any } | null>
      | Observable<{ [key: string]: any } | null> => {
      if (isEmptyInputValue(control.value)) {
        return of(null);
      } else if (control.value === initialEmail) {
        return of(null);
      } else {
        return control.valueChanges.pipe(
          debounceTime(500),
          take(1),
          switchMap(_ =>
            this.userService
              .getByEmail(control.value)
              .pipe(
                map(user =>
                  user ? { existingEmail: { value: control.value } } : null
                )
              )
          )
        );
      }
    };
  }
}
*/
