import { Component, EventEmitter, Input, Output } from '@angular/core';
import { kwmnote } from "../shared/kwmnote";

@Component({
  selector: 'app-kwm-note-item',
  templateUrl: './kwm-note-item.component.html',
  standalone: true,
})
export class KwmNoteItemComponent {
  @Input() kwmnote: kwmnote | undefined;




}


