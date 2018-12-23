import { Component, OnInit } from '@angular/core';
import { DialogState } from '../_models/dialog-state';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-publication-dialog',
  templateUrl: './publication-dialog.component.html',
  styleUrls: ['./publication-dialog.component.scss']
})
export class PublicationDialogComponent implements OnInit {

  ngOnInit(): void {

  }

  publicationForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  options: IDialogOptions;

  constructor(private state: DialogState) {
    this.options = state.options;
  }

  onOk() {
    this.state.modal.close('confirmed');
  }

  onCancel() {
    this.state.modal.dismiss('not confirmed');
  }
}
