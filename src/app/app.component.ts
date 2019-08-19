import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from './store/reducers';
import { SetMessage } from './store/actions';
import { showLoader, getMessage } from './store/selectors';
import { MessageTypeEnum } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy
{
  showLoader: Observable<boolean>;
  messageSelectSubs: Subscription;
  snackBarSubs: Subscription;

  constructor(private store: Store<AppState>, private snackBar: MatSnackBar)
  {
    this.showLoader = this.store.pipe(select(showLoader()));

    this.messageSelectSubs = this.store
      .select(getMessage())
      .subscribe({
        next: (message) => this.openSnackBar(message)
      });
  }

  openSnackBar(message: { text: string, type: MessageTypeEnum })
  {
    if (message.text)
    {
      const snackBarConfig: MatSnackBarConfig = {
        duration: 5000,
        panelClass: ''
      };

      switch (message.type)
      {
        case MessageTypeEnum.Error:
          snackBarConfig.panelClass = 'snackbar-danger';
          break;

        case MessageTypeEnum.Warning:
          snackBarConfig.panelClass = 'snackbar-warning';
          break;

        default:
          break;
      }

      this.snackBarSubs = this.snackBar
        .open(message.text, 'OK', snackBarConfig)
        .afterDismissed()
        .subscribe({
          next: () => this.store.dispatch(new SetMessage({ messageText: undefined, messageType: undefined }))
        });
    }
  }

  ngOnDestroy()
  {
    this.messageSelectSubs.unsubscribe();
    this.snackBarSubs.unsubscribe();
  }
}
