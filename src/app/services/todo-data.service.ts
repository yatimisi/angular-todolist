import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { List } from '../models/list';
import { Todo } from '../models/todo';
import { environment } from '../../environments/environment';
import { LoggingService } from './logging.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  private url = `${environment.host}/lists`;

  constructor(
    private http: HttpClient,
    private loggingService: LoggingService
  ) { }

  // create
  insterTodo(listId: number, todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.url}/${listId}/todos`, todo, httpOptions).pipe(
      tap(data => this.loggingService.log(data, 'Inster Todo:')),
      catchError(this.handleError<Todo>('Todo Inster'))
    );
  }

  // Read
  getAllLists(): Observable<List[]> {
    return this.http.get<List[]>(this.url).pipe(
      tap(data => this.loggingService.log(data, 'Lists:')),
      catchError(this.handleError('List all', []))
    );
  }

  getAllTodos(id: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.url}/${id}/todos`).pipe(
      tap(data => this.loggingService.log(data, 'Todos:')),
      catchError(this.handleError('Todo all', []))
    );
  }

  // Update
  updateListTitle(list: List): Observable<List> {
    return this.http.patch<List>(`${this.url}/${list.id}`, list, httpOptions).pipe(
      tap(data => this.loggingService.log(data, 'Update ListTitle:')),
      catchError(this.handleError<List>('ListTitle Update'))
    );
  }

  // FIXME: function 會觸發，但不會觸發 http.patch
  updateTodoComplete(listId: number, todo: Todo): void {
    console.log(`${this.url}/${listId}/todos/${todo.id}`);
    console.log(todo);
    this.http.patch<Todo>(
      `${this.url}/${listId}/todos/${todo.id}`,
      { complete: todo.complete },
      httpOptions
    ).pipe(
      tap(data => this.loggingService.log(data, 'Update Complete:')),
      catchError(this.handleError<Todo>('Complete Update'))
    );
  }

  updateTodoTitle(listId: number, todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(`${this.url}/${listId}/todos/${todo.id}`, todo, httpOptions).pipe(
      tap(data => this.loggingService.log(data, 'Update TodoTitle:')),
      catchError(this.handleError<Todo>('TodoTitle Update'))
    );
  }

  updateTodoDetail(listId: number, todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(`${this.url}/${listId}/todos/${todo.id}`, todo, httpOptions).pipe(
      tap(data => this.loggingService.log(data, 'Update TodoDetail:')),
      catchError(this.handleError<Todo>('TodoDetail Update'))
    );
  }

  // delete
  deleteTodo(listId: number, todoId: number): Observable<Todo> {
    return this.http.delete<Todo>(`${this.url}/${listId}/todos/${todoId}`, httpOptions).pipe(
      tap(data => this.loggingService.log(data, 'Delete Todo:')),
      catchError(this.handleError<Todo>('Todo delete'))
    );
  }

  private handleError<T>(name: string, result?: T) {
    return (error: any) => {
      this.loggingService.log(error, `Error at '${name}'`);
      return of(result as T);
    };
  }
}
