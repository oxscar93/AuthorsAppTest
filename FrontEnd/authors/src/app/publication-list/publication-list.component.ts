import { Component, OnInit } from '@angular/core';;
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
  authorName: string;

  constructor(private route:ActivatedRoute,
              private publicationService: PublicationService) { }

  ngOnInit() {
    this.setDefaultData();
  }

  setDefaultData(){
    this.route.data
    .subscribe((data: { entity: AuthorPublicationResolve }) => {
      this.publicationList = data.entity.authorPublicationList
      this.authorId = data.entity.authorId;
      this.authorName = data.entity.name
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
