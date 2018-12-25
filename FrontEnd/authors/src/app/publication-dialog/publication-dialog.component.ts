import { Component, OnInit } from '@angular/core';
import { DialogState } from '../_models/dialog-state';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthorPublication } from '../publication-list/author-publication';

@Component({
  selector: 'app-publication-dialog',
  templateUrl: './publication-dialog.component.html',
  styleUrls: ['./publication-dialog.component.scss']
})
export class PublicationDialogComponent implements OnInit {

  authorPublication: AuthorPublication;
  options: IDialogOptions;

  ngOnInit(): void {
    this.authorPublication = new AuthorPublication(null, null, null);
  }

  constructor(private state: DialogState) {
    this.options = state.options;
  }

  onOk() {
    this.authorPublication.publicationDate = new Date(Date.now());
    this.state.modal.close(this.authorPublication);
  }

  onCancel() {
    this.state.modal.dismiss('not confirmed');
  }
}
