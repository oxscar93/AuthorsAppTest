import { Injectable } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Injectable()
export class DialogState {
  /**
   * The last options passed ConfirmService.confirm()
   */
  options: IDialogOptions;

  /**
   * The last opened confirmation modal
   */
  modal: NgbModalRef;

  /**
   * The template containing the confirmation modal component
   */
  templates: Array<any>;

  constructor(){
    this.templates = [];
  }
}
