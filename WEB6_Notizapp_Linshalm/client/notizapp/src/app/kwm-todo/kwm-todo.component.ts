import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { kwmtodo } from "../shared/kwmtodo";
import { KwmTodoItemComponent } from "../kwm-todo-item/kwm-todo-item.component";
import {NgClass, NgForOf} from "@angular/common";
import {KwmDataService} from "../shared/kwm-data.service";
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-kwm-todo-list',
  templateUrl: './kwm-todo.component.html',
  standalone: true,
  imports: [
    NgForOf,
    KwmTodoItemComponent,
    RouterLink,
    NgClass
  ]
})
export class KwmTodoListComponent implements OnInit {
  kwmtodos: kwmtodo[] = [];
  @Input() kwmtodo: kwmtodo[] = [];

  constructor(private app:KwmDataService) {
  }



  ngOnInit() {
    this.app.getAllTodos().subscribe(res => {this.kwmtodos = res;});
  }

}
