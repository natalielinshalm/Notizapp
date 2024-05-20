import { Component, Input, OnInit } from '@angular/core';
import { kwmnote } from "../shared/kwmnote";
import { KwmNoteItemComponent} from "../kwm-note-item/kwm-note-item.component";
import { NgForOf } from "@angular/common";
import { KwmDataService } from "../shared/kwm-data.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-kwm-note-list',
  templateUrl: './kwm-note.component.html',
  imports: [
    KwmNoteItemComponent,
    NgForOf,
    RouterLink
  ],
  standalone: true,
})
export class KwmNoteListComponent implements OnInit {
  kwmnotes: kwmnote[] = [];
  @Input() kwmnote: kwmnote[] = [];



  constructor(private app: KwmDataService) {
  }

  ngOnInit() {
  this.app.getAllNotes().subscribe(res => {this.kwmnotes = res;})
  }

}
