import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponse, Response } from '../models';
import { API_URL, responseHandler } from '../shared';

@Injectable()
export class AuthService
{

  constructor(private http: HttpClient) { }

  logIn(email: string, password: string): Observable<LoginResponse | any>
  {
    const body = JSON.stringify({ email, password });

    return this.http.post(`${API_URL}/auth/login`, body)
      .pipe(
        tap((res: Response) =>
        {
          responseHandler(200, res);
        })
      );
  }

  signUp(name: string, userName: string, email: string, password: string): Observable<{ userId: string } | any>
  {
    const body = { name, userName, email, password };
    return this.http.post(`${API_URL}/auth/signup`, body)
      .pipe(
        tap((res: Response) =>
        {
          responseHandler(201, res);
        })
      );
  }
}
