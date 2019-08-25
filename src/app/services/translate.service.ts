import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AppTranslateService
{

  constructor(private translate: TranslateService)
  {
    this.translate.setDefaultLang('en');
  }

  changeLang(lang: string)
  {
    return new Promise(resolve =>
    {
      this.translate
        .use(lang)
        .subscribe({
          next: () =>
          {
            this.changeAttributes(lang);
            resolve();
          }
        });
    });
  }

  changeAttributes(lang: string)
  {
    const html = document.getElementsByTagName('html')[0];
    switch (lang)
    {
      case 'fa':
        html.setAttribute('lang', 'fa');
        break;
      case 'en':
      default:
        html.setAttribute('lang', 'fa');
        break;
    }
  }
}
