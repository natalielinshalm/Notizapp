import {kwmlist, kwmtodo} from "./kwmlist";

export class TodoFactory {
  static empty(): kwmtodo {
    return new kwmtodo(0, '', new Date(), 0, '');
  }

  static fromObject(rawkwmtodo: any):kwmtodo {
    return new kwmtodo(
      rawkwmtodo.todo_id,
      rawkwmtodo.title,
      rawkwmtodo.description,
      rawkwmtodo.note_id,
      typeof (rawkwmtodo.dueDate) === 'string' ? new Date(rawkwmtodo.dueDate) : rawkwmtodo.dueDate,
    );
}
}
