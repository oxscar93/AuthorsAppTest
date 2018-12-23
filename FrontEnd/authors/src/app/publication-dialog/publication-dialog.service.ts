import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import {DialogState } from '../_models/dialog-state';
@Injectable()
export class PublicationService {

  constructor(private modalService: NgbModal, private state: DialogState) {}

  /**
   * Opens a confirmation modal
   * @param options the options for the modal (title and message)
   * @returns {Promise<any>} a promise that is fulfilled when the user chooses to confirm, and rejected when
   * the user chooses not to confirm, or closes the modal
   */
  addPublication(options: IDialogOptions): Promise<any> {
    this.state.options = options;
    this.state.modal = this.modalService.open(this.state.templates["publicationDialog"]);
    return this.state.modal.result;
  }
}
