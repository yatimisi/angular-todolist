import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { List } from '../../models/list';
import { Todo } from '../../models/todo';
import { TodoDataService } from '../../services/todo-data.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input() list: List;
  @Input() isInsterTodo: boolean;

  todos$: Observable<Todo[]>;
  todo = {} as Todo;
  istodoTitleEdit = [];
  todoTitleEditValue = '';
  istodoDetailEdit = [];
  todoDetailEditValue = '';
  form: FormGroup;

  constructor(
    private todoDataService: TodoDataService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.getTodos(this.list.todos);
  }

  getTodos(id: number) {
    this.todos$ = this.todoDataService.getAllTodos(id);
  }

  isComplete(todo: Todo) {
    this.todoDataService.updateTodoComplete(this.list.todos, todo);
  }

  todoTitleEdit(todo: Todo) {
    this.istodoTitleEdit[todo.id] = true;
    this.todoTitleEditValue = todo.todoTitle;
  }

  todoTitleSave(todo: Todo) {
    this.istodoTitleEdit[todo.id] = false;
    this.todoTitleEditValue = todo.todoTitle;
    this.todoDataService.updateTodoTitle(this.list.todos, { id: todo.id, ...todo }).subscribe(source => {
      if (!source) {
        this.getTodos(this.list.todos);
      }
    });
  }

  todoTitleCancel(todo: Todo) {
    this.istodoTitleEdit[todo.id] = false;
    todo.todoTitle = this.todoTitleEditValue;
  }

  todoDetailEdit(todo: Todo) {
    this.istodoDetailEdit[todo.id] = true;
    this.todoDetailEditValue = todo.todoDetail;
  }

  todoDetailSave(todo: Todo) {
    this.istodoDetailEdit[todo.id] = false;
    this.todoDetailEditValue = todo.todoDetail;
    this.todoDataService.updateTodoDetail(this.list.todos, { id: todo.id, ...todo }).subscribe(source => {
      if (!source) {
        this.getTodos(this.list.todos);
      }
    });
  }

  todoDetailCancel(todo: Todo) {
    this.istodoDetailEdit[todo.id] = false;
    todo.todoDetail = this.todoDetailEditValue;
  }

  todoDelete(todo: Todo) {
    if (!confirm('Delete?')) {
      return;
    }
    this.todoDataService.deleteTodo(this.list.todos, todo.id).subscribe(source => {
      if (source) {
        this.getTodos(this.list.todos);
      }
    });
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      todoTitle: [this.todo.todoTitle, [Validators.required, Validators.maxLength(50)]],
      todoDetail: [this.todo.todoDetail, [Validators.required, Validators.maxLength(100)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      alert('Form not valid.');
      return;
    }

    this.todoDataService.insterTodo(this.list.todos, this.form.value).subscribe(source => {
      if (source) {
        this.getTodos(this.list.todos);
        this.todoInstallCancel();
      }
    });

  }
  showFieldHint(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return field.invalid && (field.dirty || field.touched);
  }

  todoInstallCancel() {
    this.isInsterTodo = false;
  }
}
