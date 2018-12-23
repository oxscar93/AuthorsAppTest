import { Component, OnInit } from '@angular/core';
import { PublicationDialogService } from '../publication-dialog/publication-dialog.service';
import { PublicationService } from './publication.service';
import { ActivatedRoute } from '@angular/router';
import { AuthorPublication } from './author-publication';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit {
  publicationList: AuthorPublication[];

  constructor(private route:ActivatedRoute,
              private publicationDialogService : PublicationDialogService) { }

  ngOnInit() {
    this.setDefaultData();
  }

  addPublication(){
    this.publicationDialogService.addPublication(null);
  }

  setDefaultData(){
    this.route.data
    .subscribe((data: { publicationList: Array<AuthorPublication> }) => {
      this.publicationList = data.publicationList
    });
  }

}
