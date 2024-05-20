import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {SearchComponent} from "../search/search.component";
import {kwmlist} from "../shared/kwmlist";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    SearchComponent
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

  constructor(private router: Router, private route: ActivatedRoute) {
  }



  listSelected(kwmlist: kwmlist) {
    this.router.navigate(['../lists', kwmlist.id], {relativeTo: this.route});
  }
}
