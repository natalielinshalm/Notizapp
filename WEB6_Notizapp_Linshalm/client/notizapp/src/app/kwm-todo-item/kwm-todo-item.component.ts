import { Component, EventEmitter, Input, Output } from '@angular/core';
import { kwmtodo } from '../shared/kwmtodo';

@Component({
  selector: 'app-kwm-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './kwm-todo-item.component.html',
})
export class KwmTodoItemComponent {
  @Input() kwmtodo: kwmtodo | undefined;
  @Output() showDetailsEvent = new EventEmitter<kwmtodo>();

  showKwmTodoDetails() {
    this.showDetailsEvent.emit(this.kwmtodo);
  }
}
