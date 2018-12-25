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
import { PublicationDialogService } from './publication-dialog/publication-dialog.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SidebarService } from './sidebar/sidebar.service';
import { HttpModule } from '@angular/http';
import { PublicationResolverService } from './publication-list/publication-resolver.service';
import { PublicationService } from './publication-list/publication.service';
import { PublicationBrowserComponent } from './publication-browser/publication-browser.component';
import { PublicationBrowserService } from './publication-browser/publication-browser.service';
import { PublicationBrowserResolverService } from './publication-browser/publication-browser-resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PublicationListComponent,
    PublicationDialogComponent,
    PublicationTemplateDirective,
    PublicationBrowserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule
  ],
  exports: [
    PublicationTemplateDirective
  ],
  providers: [DialogState, 
              PublicationService,
              PublicationResolverService,
              SidebarService,
              PublicationDialogService,
              PublicationBrowserResolverService,
              PublicationBrowserService],

  bootstrap: [AppComponent]
})
export class AppModule { }
