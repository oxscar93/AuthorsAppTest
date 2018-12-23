import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../publication-dialog/publication-dialog.service';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit {

  constructor(private publicationDialogService : PublicationService) { }

  ngOnInit() {
  }

  addPublication(){
    this.publicationDialogService.addPublication(null);
  }

}
