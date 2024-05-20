import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {KwmListComponent} from "./kwm-list/kwm-list.component";
import {KwmDetailsComponent} from "./kwm-list-details/kwm-list-details.component";
import {KwmNoteListComponent} from "./kwm-note/kwm-note.component";
import {KwmNoteDetailsComponent} from "./kwm-note-details/kwm-note-details.component";
import {KwmTagListComponent} from "./kwm-tag/kwm-tag.component";
import {KwmTagDetailsComponent} from "./kwm-tag-details/kwm-tag-details.component";
import {KwmTodoListComponent} from "./kwm-todo/kwm-todo.component";
import {KwmTodoDetailsComponent} from "./kwm-todo-details/kwm-todo-details.component";
import {ListFormComponent} from "./list-form/list-form.component";
import {LoginComponent} from "./login/login.component";
import {canNavigateToAdminGuard} from "./can-navigate-to-admin.guard";
import {NoteFormComponent} from "./note-form/note-form.component";
import {NoteFactory} from "./shared/note-factory";

export const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component: HomeComponent},

  //Listen
  {path:'lists', component: KwmListComponent},
  {path:'lists/:id', component: KwmDetailsComponent},
  //Notizen
  {path:'notes', component: KwmNoteListComponent},
  {path:'notes/:id', component: KwmNoteDetailsComponent},
  //Tags
  {path:'tags', component: KwmTagListComponent},
  {path:'tags/:id', component: KwmTagDetailsComponent},
  //Todos
  {path:'todos', component: KwmTodoListComponent},
  {path:'todos/:id', component: KwmTodoDetailsComponent},

  {path:'admin', component:ListFormComponent, canActivate: [canNavigateToAdminGuard]},
  {path:'admin/:id', component:ListFormComponent, canActivate: [canNavigateToAdminGuard]},

  //notes
  { path: 'note-form', component: NoteFormComponent, canActivate: [canNavigateToAdminGuard] },
  { path: 'note-form/:id', component: NoteFormComponent, canActivate: [canNavigateToAdminGuard] },

  {path:'login', component: LoginComponent}

];
