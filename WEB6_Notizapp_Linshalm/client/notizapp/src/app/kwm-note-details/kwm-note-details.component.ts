import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { kwmnote } from "../shared/kwmnote";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import { KwmDataService} from "../shared/kwm-data.service";
import {NoteFactory} from "../shared/note-factory";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-kwm-note-details',
  templateUrl: './kwm-note-details.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ]
})
export class KwmNoteDetailsComponent implements OnInit {
  kwmnote:kwmnote = NoteFactory.empty();

  constructor(private app: KwmDataService, private route: ActivatedRoute,
              private router:Router,
              private toastr: ToastrService,
              public authService:AuthenticationService) {
  }


ngOnInit() {
  const params = this.route.snapshot.params;
  this.app.getNoteById(params['id']).subscribe((n: kwmnote) => {
    this.kwmnote = n;

  });
}

  removeNote(id: number) {
    if(confirm("Notiz wirklich löschen?")) {
      this.app.removeNote(this.kwmnote.id).subscribe(
        () => { this.router.navigate(['../'],
          {relativeTo: this.route});
          this.toastr.success('Notiz wurde gelöscht');
        }
      );
    }
  }
}
