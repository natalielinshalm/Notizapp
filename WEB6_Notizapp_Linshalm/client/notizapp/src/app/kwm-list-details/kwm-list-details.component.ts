import {Component, OnInit} from '@angular/core';
import { kwmlist } from "../shared/kwmlist";
import {KwmDataService} from "../shared/kwm-data.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {kwmlistFactory} from "../shared/list-factory";
import {ToastrService} from "ngx-toastr";
import {DatePipe, NgIf} from "@angular/common";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'app-kwm-details',
  templateUrl: './kwm-list-details.component.html',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    NgIf
  ]
})
export class KwmDetailsComponent implements OnInit {
  kwmlist:kwmlist = kwmlistFactory.empty();

  constructor(private app: KwmDataService,
              private route: ActivatedRoute,
              private router:Router,
              private toastr: ToastrService,
              public authService:AuthenticationService) {
  }

  ngOnInit() {
   const params = this.route.snapshot.params;
    this.app.getListById(params['id']).subscribe((l: kwmlist) => {
      this.kwmlist = l;

  });
  }

  removeList(id: number) {
    if(confirm("Liste wirklich löschen?")) {
      this.app.remove(this.kwmlist.id).subscribe(
        () => { this.router.navigate(['../'],
          {relativeTo: this.route});
      this.toastr.success('Liste wurde gelöscht');
    }
    );
  }
}
}
