import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {kwmlistFactory} from "../shared/list-factory";
import {KwmDataService} from "../shared/kwm-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {ListFormErrorMessages} from "./list-form-error-messages";
import {ListValidators} from "../shared/list-validators";

@Component({
  selector: 'app-list-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './list-form.component.html',
  styles: ``
})
export class ListFormComponent implements OnInit{
  listForm: FormGroup;
  kwmlist = kwmlistFactory.empty();
  isUpdatingList: boolean = false;
  errors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private app : KwmDataService,
    private route: ActivatedRoute,
    private router: Router
  )
  {
    this.listForm = this.fb.group({});
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if(id) {
      this.isUpdatingList = true;
      this.app.getListById(id).subscribe(kwmlist => {
        this.kwmlist = kwmlist;
        this.initList();
      });
    }
    this.initList();
  }

  initList() {
    this.listForm = this.fb.group({
      id: this.kwmlist.id,
      name: [this.kwmlist.name,
        Validators.required],

      user_id:
        [this.kwmlist.user_id, [Validators.required, ListValidators.userIdFormat]],

      createdAt: [this.kwmlist.createdAt, Validators.required]
    });

    this.listForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  submitForm() {
    const kwmlist = kwmlistFactory.fromObject(this.listForm.value);

    kwmlist.id = this.kwmlist.id;


    console.log(kwmlist);
    if(this.isUpdatingList){
      this.app.updateList(kwmlist).subscribe(() => {
        this.router.navigate(['../../lists', kwmlist.id], {relativeTo: this.route});
      });

    }else {
      //hack
      kwmlist.id = 1;
      this.app.createList(kwmlist).subscribe(() => {
        this.kwmlist = kwmlistFactory.empty();
        this.listForm.reset(kwmlistFactory.empty());
        this.router.navigate(['../lists'], {relativeTo: this.route});
        });
      }

  }

  private updateErrorMessages() {
    this.errors = {};
    for (const message of ListFormErrorMessages) {
      const control = this.listForm.get(message.forControl);
      if (control && control.dirty && control.invalid &&
        control.errors && control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}


