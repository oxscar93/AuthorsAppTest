import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationDialogComponent } from './publication-dialog/publication-dialog.component';
import { DialogState } from './_models/dialog-state';
import { PublicationTemplateDirective } from './publication-dialog/publication-dialog.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PublicationService } from './publication-dialog/publication-dialog.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PublicationListComponent,
    PublicationDialogComponent,
    PublicationTemplateDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [
    PublicationTemplateDirective
  ],
  providers: [DialogState, PublicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
