import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicationBrowserService } from './publication-browser.service';
import { PublicationBrowserResolver } from './publication-browser';

@Component({
  selector: 'app-publication-browser',
  templateUrl: './publication-browser.component.html',
  styleUrls: ['./publication-browser.component.scss']
})
export class PublicationBrowserComponent implements OnInit {
  publicationList: any;
  paginationLastKey: any;
  searchTitle: string;

  constructor(private route:ActivatedRoute, private publicationService: PublicationBrowserService) { }

  ngOnInit() {
    this.setDefaultData();
  }

  setDefaultData(){
    this.route.data
    .subscribe((data: { entity: PublicationBrowserResolver }) => {
      this.publicationList = data.entity.authorPublicationList.result;
      this.paginationLastKey = data.entity.authorPublicationList.lastKey;
      this.searchTitle = data.entity.title;
    });
  }

  getPublicationListByTitle(){
    this.publicationService.getPublicationListByTitle(this.searchTitle, this.paginationLastKey)
    .subscribe(res => {
      this.publicationList= this.publicationList.concat(res.result);
      this.paginationLastKey = res.lastKey
    });
  }
}
