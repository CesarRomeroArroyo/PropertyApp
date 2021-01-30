import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const validateEqual: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const passConfirmation = control.get('passConfirmation');

  return password.value === passConfirmation.value ? null : { 'noSonIguales': true };
};
