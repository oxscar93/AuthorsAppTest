import { Directive, TemplateRef } from '@angular/core';
import { DialogState } from '../_models/dialog-state';

@Directive({
    selector: "[publicationDialog]"
  })
  export class  PublicationTemplateDirective {
    constructor(publicationTemplate: TemplateRef<any>, state: DialogState) {
      state.templates["publicationDialog"] = publicationTemplate;
    }
  }
