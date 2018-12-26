import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationResolverService } from './publication-list/publication-resolver.service';
import { PublicationBrowserComponent } from './publication-browser/publication-browser.component';
import { PublicationBrowserResolverService } from './publication-browser/publication-browser-resolver.service';

const routes: Routes = 

[{path: 'publication-list', component:  PublicationListComponent,  runGuardsAndResolvers: 'always',
  resolve:{entity: PublicationResolverService}},
  {path: 'publication-browser', component:  PublicationBrowserComponent, runGuardsAndResolvers: 'always',
  resolve:{entity: PublicationBrowserResolverService}}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
