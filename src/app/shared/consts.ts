import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const API_URL = !environment.production
  ? 'http://localhost:8080'
  : 'https://ahmad-todolist-api.herokuapp.com';

export function date()
{
  return new Date().toJSON().slice(0, 10).replace(/-/g, '/');
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
