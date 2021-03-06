import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AuthorPublication, PaginatedAuthorPublicationResult } from './author-publication';
import { environment } from 'src/environments/environment';

@Injectable()
export class PublicationService {
  constructor(private http:Http) { }

  base = environment.baseServiceUrl;
  options = new RequestOptions({ headers: new Headers(
                                { 'Content-Type': 'application/json'})});


  getPublicationList(id:string, sortDesc? :boolean) : Observable<Array<AuthorPublication>>  {   
      var sort = sortDesc ? sortDesc : false;
      return this.getEntity("/get-publication-list/" + id + "/" + sort,
              this.extractPublicationData).pipe(map(r => {
              return r;
            }));      
  }

  addPublication(publication: AuthorPublication)  {   
    return this.addtEntity("/add/", publication);
  }

  private getEntity(resource: string, extractDataFunc: any) : Observable<Array<AuthorPublication>> {
      return this.http.get(this.base + resource, this.options)
        .pipe(map(extractDataFunc))
  }

  private addtEntity(resource: string, body: any) {
    return this.http.post(this.base + resource, body, this.options);
  }

  private extractPublicationData(res: Response) {
      let body = res.json();
      var resultList = [];
     
      body.forEach(el => {      
            resultList.push(new AuthorPublication(el.title, el.body, new Date(el.date)));      
     });

    return resultList;
  }
}
