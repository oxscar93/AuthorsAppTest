import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { PaginatedAuthorPublicationResult, AuthorPublication } from '../publication-list/author-publication';

@Injectable()
export class PublicationBrowserService {
  constructor(private http:Http) { }

  base = environment.baseServiceUrl;
  options = new RequestOptions({ headers: new Headers(
                                { 'Content-Type': 'application/json'})});


  getPublicationListByTitle(title:string, lastKey: any) : Observable<PaginatedAuthorPublicationResult>  {   
    return this.postEntity("/get-publication-list-by-title/" + title, lastKey,
            this.extractPublicationPaginatedData).pipe(map(r => {
            return r;
          }));      
  }


  private postEntity(resource: string, body:string, extractDataFunc: any) : Observable<PaginatedAuthorPublicationResult> {
    return this.http.post(this.base + resource, body, this.options)
      .pipe(map(extractDataFunc))
  }


  private extractPublicationPaginatedData(res: Response) {
    let body = res.json();  
    let publicationList = [];
    
    if (body.result){
        body.result.forEach(el => {      
            publicationList.push(new AuthorPublication(el.title, el.body, new Date(el.date)));      
          });
    }
  
    return new PaginatedAuthorPublicationResult(publicationList, body.lastKey);     
}
}
