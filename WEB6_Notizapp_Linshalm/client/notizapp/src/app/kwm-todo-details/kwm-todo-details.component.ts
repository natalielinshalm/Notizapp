import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { kwmtodo } from '../shared/kwmtodo';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {KwmDataService} from "../shared/kwm-data.service";
import {NoteFactory} from "../shared/note-factory";
import {TodoFactory} from "../shared/todo-factory";
import {ToastrService} from "ngx-toastr";
import {DatePipe, NgIf} from "@angular/common";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'app-kwm-todo-details',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    NgIf
  ],
  templateUrl: './kwm-todo-details.component.html',
})
export class KwmTodoDetailsComponent implements OnInit {
  kwmtodo: kwmtodo = TodoFactory.empty();

  constructor(private app: KwmDataService, private route: ActivatedRoute
              , private router: Router,
                private toastr: ToastrService,
                public authService:AuthenticationService) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.app.getTodoById(params['id']).subscribe((t: kwmtodo) => {
      this.kwmtodo = t;

    });
  }
  removeTodo(id: number) {
    if(confirm("Todo wirklich löschen?")) {
      this.app.removeTodo(this.kwmtodo.id).subscribe(
        () => { this.router.navigate(['../'],
          {relativeTo: this.route});
          this.toastr.success('Todo wurde gelöscht');
        }
      );
    }
  }
}
