import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteFactory } from '../shared/note-factory';
import { KwmDataService } from '../shared/kwm-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { NoteFormErrorMessages } from './note-form-error-messages';
import {kwmlistFactory} from "../shared/list-factory";

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './note-form.component.html',
  styles: ``
})
export class NoteFormComponent implements OnInit {
  noteForm: FormGroup;
  kwmnote = NoteFactory.empty();
  isUpdatingNote: boolean = false;
  errors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private app: KwmDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.noteForm = this.fb.group({});
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isUpdatingNote = true;
      this.app.getNoteById(id).subscribe(kwmnote => {
        this.kwmnote = kwmnote;
        this.initNote();
      });
    } else {
      this.initNote();
    }
  }

  initNote() {
    this.noteForm = this.fb.group({
      id: [this.kwmnote.id],
      title: [this.kwmnote.title, Validators.required],
      description: [this.kwmnote.description],
      list_id: [this.kwmnote.list_id, Validators.required]
    });

    this.noteForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  submitNoteForm() {
    const kwmnote = NoteFactory.fromObject(this.noteForm.value);

    if (this.isUpdatingNote) {
      const noteId = this.noteForm.get('id')?.value; // Abrufen der ID aus dem Formular
      if (noteId) {
        kwmnote.id = noteId; // Setzen der ID in der kwmnote-Instanz
        this.app.updateNote(kwmnote).subscribe(
          () => {
            this.router.navigate(['../../notes', kwmnote.id], { relativeTo: this.route });
          },
          error => {
            console.error('Update failed', error);
            this.errors['update'] = 'Update failed. Please try again.';
          }
        );
      } else {
        console.error('Note ID is undefined');
      }

    }else {
      //hack
      kwmnote.id = 1;
      this.app.createNote(kwmnote).subscribe(() => {
        this.kwmnote = NoteFactory.empty();
        this.noteForm.reset(NoteFactory.empty());
        this.router.navigate(['../note'], {relativeTo: this.route});
      });
    }

  }

  private updateErrorMessages() {
    this.errors = {};
    for (const message of NoteFormErrorMessages) {
      const control = this.noteForm.get(message.forControl);
      if (control && control.dirty && control.invalid &&
        control.errors && control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
