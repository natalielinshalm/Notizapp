import {Component, EventEmitter, Input, Output} from '@angular/core';
import {kwmtag} from '../shared/kwmtag';

@Component({
  selector: 'app-kwm-tag-item',
  standalone: true,
  imports: [],
  templateUrl: './kwm-tag-item.component.html',
})
export class KwmTagItemComponent {
  @Input() kwmtag: kwmtag | undefined;
  @Output() showDetailsEvent = new EventEmitter<kwmtag>();

  showKwmTagDetails() {
    this.showDetailsEvent.emit(this.kwmtag);
  }
}
