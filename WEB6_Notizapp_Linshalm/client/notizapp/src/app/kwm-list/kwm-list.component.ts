import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { kwmlist } from "../shared/kwmlist";
import { KwmListItemComponent } from "../kwm-list-item/kwm-list-item.component";
import { NgForOf } from "@angular/common";
import {KwmDataService} from "../shared/kwm-data.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-kwm-list',
  templateUrl: './kwm-list.component.html',
  imports: [
    KwmListItemComponent,
    NgForOf,
    RouterLink
  ],
  standalone: true
})

export class KwmListComponent implements OnInit {
  kwmlists: kwmlist[] = [];
  @Input() kwmlist: kwmlist[] = [];


  constructor(private app:KwmDataService) {
  }

  ngOnInit() {
    this.app.getAllLists().subscribe(res => {
      console.log('Fetched lists:', res);
      this.kwmlists = res;
    });
  }
}
