import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {kwmtag} from '../shared/kwmtag';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import { KwmDataService} from "../shared/kwm-data.service";
import {NoteFactory} from "../shared/note-factory";
import {TagFactory} from "../shared/tag-factory";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";
import {NgIf} from "@angular/common";
@Component({
  selector: 'app-kwm-tag-details',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './kwm-tag-details.component.html',
})
export class KwmTagDetailsComponent implements OnInit {
  kwmtag: kwmtag = TagFactory.empty();



  constructor(private app: KwmDataService, private route: ActivatedRoute,
              private router:Router,
              private toastr: ToastrService,
              public authService:AuthenticationService) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.app.getTagById(params['id']).subscribe((t: kwmtag) => {
      this.kwmtag = t;

    });
  }
  removeTag(id: number) {
    if(confirm("Tag wirklich löschen?")) {
      this.app.removeTag(this.kwmtag.id).subscribe(
        () => { this.router.navigate(['../'],
          {relativeTo: this.route});
          this.toastr.success('Tag wurde gelöscht');
        }
      );
    }
  }
}
