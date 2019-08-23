import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const API_URL = !environment.production
  ? 'http://localhost:8080'
  : 'https://ahmad-todolist-api.herokuapp.com';

export function date()
{
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  let locale = document.querySelector('html').getAttribute('lang');
  switch (locale)
  {
    case 'fa':
      locale += 'IR';
      break;

    case 'en':
    default:
      locale += 'US';
      break;
  }

  return new Date().toLocaleDateString(locale, options);
}

export function setHTTPOptions()
{
  const token = localStorage.getItem('token');
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    })
  };

  return httpOptions;
}
