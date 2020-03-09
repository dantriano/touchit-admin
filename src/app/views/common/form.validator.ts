import { ValidationErrors, AbstractControl, AsyncValidatorFn, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class FormValidator {

  static valueExist(service: any, model:string): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      const input = { [FormValidator.getName(control)]: control.value }
      return service.getOne(input).pipe(tap(({ data }) => {
        if (data[model] && data[model]._id !=null && control.parent.value._id != data[model]._id){
          control.setErrors({ 'exist': true });
          return {'exist':true}
        } 
        else return null;
      }
      ));
    };
  }
  static getName(control: AbstractControl): string | null {
    let group = <FormGroup>control.parent;
    if (!group) {
      return null;
    }

    let name: string;

    Object.keys(group.controls).forEach(key => {
      let childControl = group.get(key);

      if (childControl !== control) {
        return;
      }

      name = key;
    });

    return name;
  }
}