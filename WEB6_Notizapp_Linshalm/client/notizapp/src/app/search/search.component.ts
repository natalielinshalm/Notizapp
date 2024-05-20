import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs";
import {kwmlist} from "../shared/kwmlist";
import {KwmDataService} from "../shared/kwm-data.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './search.component.html',
  styles: ``
})
export class SearchComponent implements OnInit {
  keyup: EventEmitter<string> = new EventEmitter<string>();
  foundLists: kwmlist[] = [];
  isLoading: boolean = false;
  @Output() listSelected: EventEmitter<kwmlist> = new EventEmitter<kwmlist>();

  constructor(private app: KwmDataService) {
  }


  ngOnInit() {
    this.keyup.pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(tap(() => this.isLoading = true))
      .pipe(switchMap(searchTerm => this.app.SearchList(searchTerm)))
      .pipe(tap(() => this.isLoading = false))
      .subscribe((kwmlist: kwmlist[]) => {
        this.foundLists = kwmlist;
        console.log(kwmlist)
      });
  }


}
