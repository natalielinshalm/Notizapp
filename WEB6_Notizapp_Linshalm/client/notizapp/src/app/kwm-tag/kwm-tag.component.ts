import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { kwmtag } from "../shared/kwmtag";
import { KwmTagItemComponent} from "../kwm-tag-item/kwm-tag-item.component";
import { NgForOf } from "@angular/common";
import { KwmDataService } from "../shared/kwm-data.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-kwm-tag-list',
  templateUrl: './kwm-tag.component.html',
  standalone: true,
  imports: [
    NgForOf,
    KwmTagItemComponent,
    RouterLink
  ]
})
export class KwmTagListComponent implements OnInit {
  kwmtags: kwmtag[] = [];
  @Input() kwmtag: kwmtag[] = [];


  constructor(private app: KwmDataService) {
  }

  ngOnInit() {
    this.app.getAllTags().subscribe(res => {this.kwmtags = res;});

  }

}
