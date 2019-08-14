import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { LoginResponse, Response } from '../models';
import { API_URL, Handler } from '../shared';

@Injectable()
export class AuthService
{

  constructor(private http: HttpClient, private handler: Handler) { }

  logIn(email: string, password: string): Observable<LoginResponse | any>
  {
    const body = { email, password };

    return this.http.post(`${API_URL}/auth/login`, body)
      .pipe(
        tap((res: Response) => this.handler.responseHandler(200, res)),
        map(res => res.content)
      );
  }

  signUp(name: string, userName: string, email: string, password: string): Observable<{ userId: string } | any>
  {
    const body = { name, userName, email, password };
    return this.http.post(`${API_URL}/auth/signup`, body)
      .pipe(
        tap((res: Response) => this.handler.responseHandler(201, res)),
        map(res => res.content)
      );
  }
}
