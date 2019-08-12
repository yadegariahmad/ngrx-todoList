import { FormControl } from '@angular/forms';

export class ErrorHandler
{
  getErrorMessage(form: FormControl, type: string)
  {
    switch (type)
    {
      case 'email':
        return form.hasError('required') ? 'You must enter a value' :
          form.hasError('email') ? 'Not a valid email' : '';

      case 'password':
        return form.hasError('required') ? 'You must enter a value' :
          form.hasError('minlength') ? 'Password is too short' : '';

      case 'userName':
        return form.hasError('required') ? 'You must enter a value' : '';

      default:
        break;
    }
  }
}
