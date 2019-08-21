import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ToDo, Response } from '../models';
import { API_URL, Handler } from '../shared';

@Injectable()
export class TodoService
{

  constructor(private http: HttpClient, private handler: Handler) { }

  getTodos(): Observable<{ todos: Array<ToDo>, totalItems: number }>
  {
    return this.http.get<Response>(`${API_URL}/todo/getTodos`)
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
