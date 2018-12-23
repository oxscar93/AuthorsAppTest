import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Author } from './author';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  authorList: Author[];

  constructor(private sc: SidebarService, private router: Router) { }

  ngOnInit() {
    this.setDefaultData();
  }

  setDefaultData(){
    this.sc.getAuthorList()
    .subscribe(r => {
      this.authorList = r
    });
  }

  showPublicationList(authorId: string){
    this.router.navigate(["/publication-list/"], {queryParams: {authorId: authorId}})
  }
}
