import {Component, EventEmitter, Input, Output} from '@angular/core';
import {kwmlist} from "../shared/kwmlist";
@Component({
  selector: 'app-kwm-list-item',
  standalone: true,
  imports: [],
  templateUrl: './kwm-list-item.component.html',
})
export class KwmListItemComponent {
  @Input() kwmlist: kwmlist | undefined;
  @Output() showDetailsEvent = new EventEmitter<kwmlist>();

  showKwmDetails() {
    this.showDetailsEvent.emit(this.kwmlist);
  }
}
