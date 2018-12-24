import { Component, OnInit } from '@angular/core';
import { PublicationDialogService } from '../publication-dialog/publication-dialog.service';
import { PublicationService } from './publication.service';
import { ActivatedRoute } from '@angular/router';
import { AuthorPublication, AuthorPublicationResolve } from './author-publication';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit {
  publicationList: AuthorPublication[];
  shouldSortByDesc = false;
  sortOrderBtnTitle = "Oldests First";
  authorId: string;

  constructor(private route:ActivatedRoute,
              private publicationService: PublicationService,
              private publicationDialogService : PublicationDialogService) { }

  ngOnInit() {
    this.setDefaultData();
  }

  addPublication(){
    this.publicationDialogService.addPublication(null);
  }

  setDefaultData(){
    this.route.data
    .subscribe((data: { entity: AuthorPublicationResolve }) => {
      this.publicationList = data.entity.authorPublicationList
      this.authorId = data.entity.authorId
    });
  }

  getPublicationListSortedByDate(sortByDesc){
    this.publicationService.getPublicationList(this.authorId, sortByDesc)
    .subscribe(result => {
      this.publicationList = result;
    });

    if (sortByDesc){
      this.sortOrderBtnTitle = "Latests First";
    }else{
      this.sortOrderBtnTitle = "Oldests First";
    }

    this.shouldSortByDesc = sortByDesc;
  }
}
