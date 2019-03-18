import { Component, OnInit, Output } from '@angular/core';

import { Observable } from 'rxjs';

import { TodoDataService } from '../../services/todo-data.service';
import { List } from '../../models/list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  islistTitleEdit = [];
  @Output() isInsterTodoButton = [];
  @Output() isInsterTodo = [];
  lists$: Observable<List[]>;
  listTitleEditValue = '';

  constructor(
    private todoDataService: TodoDataService
  ) {
    this.getLists();
  }

  ngOnInit() {
  }

  // lists
  getLists() {
    this.lists$ = this.todoDataService.getAllLists();
  }


  // listTitle
  listTitleEdit(list: List) {
    this.islistTitleEdit[list.id] = true;
    this.listTitleEditValue = list.listTitle;
  }

  listTitleSave(list: List) {
    this.islistTitleEdit[list.id] = false;
    this.listTitleEditValue = list.listTitle;
    this.todoDataService.updateListTitle({ id: list.id, ...list }).subscribe(source => {
      if (!source) {
        this.getLists();
      }
    });
  }

  listTitleCancel(list: List) {
    this.islistTitleEdit[list.id] = false;
    list.listTitle = this.listTitleEditValue;
  }


  // listTodo
  insterTodoButton(id: number) {
    this.isInsterTodoButton = [];
    this.isInsterTodo = [];
    this.isInsterTodoButton[id] = true;
  }

  insterTodo(id: number) {
    this.isInsterTodo = [];
    this.isInsterTodo[id] = true;
  }

}
