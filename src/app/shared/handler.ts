import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { HideLoader } from '../store/actions';
import { Response } from '../models';

@Injectable({
  providedIn: 'root'
})
export class Handler
{
  constructor(private store: Store<AppState>) { }

  responseHandler(okStatusNumber: number, res: Response)
  {
    this.store.dispatch(new HideLoader());
    if (res.status === okStatusNumber)
    {
      return true;
    } else
    {
      throw new Error(res.message);
    }
  }

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
