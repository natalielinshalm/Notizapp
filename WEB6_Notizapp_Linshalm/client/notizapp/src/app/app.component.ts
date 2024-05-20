import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {KwmListComponent} from "./kwm-list/kwm-list.component";
import {KwmDetailsComponent} from "./kwm-list-details/kwm-list-details.component";
import {NgIf} from "@angular/common";
import {KwmNoteDetailsComponent} from "./kwm-note-details/kwm-note-details.component";
import {KwmNoteListComponent} from "./kwm-note/kwm-note.component";
import {KwmTagDetailsComponent} from "./kwm-tag-details/kwm-tag-details.component";
import {KwmTagListComponent} from "./kwm-tag/kwm-tag.component";
import {KwmTodoDetailsComponent} from "./kwm-todo-details/kwm-todo-details.component";
import {KwmTodoListComponent} from "./kwm-todo/kwm-todo.component";
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, KwmListComponent, KwmDetailsComponent,
    NgIf, KwmNoteListComponent, KwmNoteDetailsComponent,
    KwmTagDetailsComponent, KwmTagListComponent, KwmTodoDetailsComponent,
    KwmTodoListComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private authService: AuthenticationService) {
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  getLoginLabel() {
    return this.isLoggedIn() ? 'Logout' : 'Login'; // if logged in, show 'Logout', else show 'Login'
  }
}
