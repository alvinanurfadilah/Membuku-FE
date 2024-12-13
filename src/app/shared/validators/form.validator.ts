import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

export class AppValidators {
  static dateIsInPast(control: AbstractControl) {
    const inputDate = new Date(control.value);
    const currentDate = new Date();
    if (inputDate <= currentDate) {
      return null;
    }
    return { dateIsNotInPast: true };
  }

  static equalValues(controlName1: string, controlName2: string) {
    return (control: AbstractControl) => {
      const control1 = control.get(controlName1)?.value;
      const control2 = control.get(controlName2)?.value;

      if (!control1 || !control2) {
        return null; // Avoid validation if controls are not present
      }

      return control1 === control2 ? null : { notEqualValues: true };
    };
  }

  static usernameIsUnique(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return authService.getAllUsers().pipe(
        map(user => {
          if (user.some((u) => u.username == control.value)) {
            return { usernameIsNotUnique: true };
          }
          return null;
        }),
        catchError(() => of(null))
      );
    };
  }
}
