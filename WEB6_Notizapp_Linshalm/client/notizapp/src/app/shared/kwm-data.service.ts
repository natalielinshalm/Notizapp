import { Injectable } from '@angular/core';
import { kwmlist } from './kwmlist';
import { kwmnote } from './kwmnote';
import { kwmtag } from './kwmtag';
import { kwmtodo } from './kwmtodo';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, pipe, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KwmDataService {
  private api: string = 'http://notizapp24.s2110456016.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {
  }

  //Listen
  getAllLists():Observable<Array<kwmlist>>  {
    return this.http.get<Array<kwmlist>>(`${this.api}/lists`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getListById(id: number) {
    return this.http.get<kwmlist>(`${this.api}/lists/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: number) {
    return this.http.delete(`${this.api}/lists/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  SearchList(searchTerm: string): Observable<Array<kwmlist>> {
    return this.http.get<Array<kwmlist>>(`${this.api}/lists/search/${searchTerm}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateList(kwmlist: kwmlist) {
    return this.http.put(`${this.api}/lists/${kwmlist.id}`, kwmlist)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  createList(kwmlist: kwmlist) {
    return this.http.post(`${this.api}/lists`,kwmlist)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }



  //Notes
  getAllNotes(): Observable<Array<kwmnote>>{
    return this.http.get<Array<kwmnote>>(`${this.api}/notes`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getNoteById(id: number) {
    return this.http.get<kwmnote>(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  removeNote(id: number) {
    return this.http.delete(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  updateNote(kwmnote: kwmnote) {
    return this.http.put(`${this.api}/notes/${kwmnote.id}`, kwmnote)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  createNote(kwmnote: kwmnote) {
    return this.http.post(`${this.api}/notes`,kwmnote)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  //Tags
  getAllTags(): Observable<Array<kwmtag>>{
  return this.http.get<Array<kwmtag>>(`${this.api}/tags`)
.pipe(retry(3)).pipe(catchError(this.errorHandler));
}
  getTagById(id: number) {
    return this.http.get<kwmtag>(`${this.api}/tags/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  removeTag(id: number) {
    return this.http.delete(`${this.api}/tags/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //Todos
  getAllTodos():Observable<Array<kwmtodo>>{
    return this.http.get<Array<kwmtodo>>(`${this.api}/todos`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getTodoById(id: number) {
    return this.http.get<kwmtodo>(`${this.api}/todos/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  removeTodo(id: number) {
    return this.http.delete(`${this.api}/todos/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }






//Error Handling
  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
    }
  }

