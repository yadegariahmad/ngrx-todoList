import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { HideLoader, SetMessage } from '../store/actions';
import { Response } from '../models';
import { MessageTypeEnum } from './enums';

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

  errorHandler(err: Error)
  {
    this.store.dispatch(new HideLoader());
    this.store.dispatch(new SetMessage(
      {
        messageText: err.message,
        messageType: MessageTypeEnum.Error
      }
    ));
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
