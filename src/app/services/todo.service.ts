import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { ToDo, Response } from '../models';
import { API_URL, Handler, setHTTPOptions } from '../shared';

@Injectable()
export class TodoService
{
  constructor(private http: HttpClient, private handler: Handler) { }

  getTodos(): Observable<{ todos: Array<ToDo>, totalItems: number }>
  {
    const userId = localStorage.getItem('userId');
    return this.http.get<Response>(`${API_URL}/todo/getTodos?userId=${userId}`, setHTTPOptions())
      .pipe(
        tap((res: Response) => this.handler.responseHandler(200, res)),
        map(res => res.content),
        catchError(err =>
        {
          this.handler.errorHandler(err);
          return of();
        })
      );
  }

  addTodo(text: string, userId: string): Observable<{ todoID: string, creator: any }>
  {
    const body = { content: text, userId };
    return this.http.post<Response>(`${API_URL}/todo/addTodo`, body, setHTTPOptions())
      .pipe(
        tap((res: Response) => this.handler.responseHandler(201, res)),
        map(res => res.content),
        catchError(err =>
        {
          this.handler.errorHandler(err);
          return of();
        })
      );
  }

  editTodo(todoId: string, text: string): Observable<any>
  {
    const body = { content: text, todoId };
    return this.http.put<Response>(`${API_URL}/todo/updateTodo`, body, setHTTPOptions())
      .pipe(
        tap((res: Response) => this.handler.responseHandler(200, res)),
        catchError(err =>
        {
          this.handler.errorHandler(err);
          return of();
        })
      );
  }

  toggleTodo(todoId: string): Observable<any>
  {
    const userId = localStorage.getItem('userId');
    return this.http.put<Response>(`${API_URL}/todo/toggleTodo/${todoId}?userId=${userId}`, null, setHTTPOptions())
      .pipe(
        tap((res: Response) => this.handler.responseHandler(200, res)),
        catchError(err =>
        {
          this.handler.errorHandler(err);
          return of();
        })
      );
  }

  deleteTodo(todoId: string): Observable<any>
  {
    const userId = localStorage.getItem('userId');
    return this.http.delete<Response>(`${API_URL}/todo/deleteTodo/${todoId}?userId=${userId}`, setHTTPOptions())
      .pipe(
        tap((res: Response) => this.handler.responseHandler(200, res)),
        catchError(err =>
        {
          this.handler.errorHandler(err);
          return of();
        })
      );
  }
}
