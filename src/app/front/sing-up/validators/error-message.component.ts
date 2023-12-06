import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { validatorErrorMessage } from './validator-message';

@Component({
  selector: 'app-error-message',
  template: `<p>{{errorMessage}}</p>`,
  styles: ['p { color: #ff8686;  transform: translate(42px, -19px) !important; font-size: 12px; font-weight: 450; letter-spacing: .4px; margin: 0; }']
})
export class ErrorMessageComponent {
 @Input() control!: AbstractControl;
 @Input() patternType!: 'email' | 'password';

 get errorMessage(): string {
  const error = this.control?.errors;
  const validatorName = Object.keys(error ?? {})[0];

  if (validatorName === 'pattern' && this.patternType === 'email' && this.control.touched) {
    return validatorErrorMessage('patternEmail');
  } else if (validatorName === 'pattern' && this.patternType === 'password' && this.control.touched) {
    return validatorErrorMessage('patternPassword');
  } else {
    return this.control.touched && validatorName ? validatorErrorMessage(validatorName) : '';
  }
 }
}
