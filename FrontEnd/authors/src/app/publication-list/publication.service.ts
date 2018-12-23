import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AuthorPublication } from './author-publication';
import { environment } from 'src/environments/environment';

@Injectable()
export class PublicationService {
  constructor(private http:Http) { }

  base = environment.baseServiceUrl;
  options = new RequestOptions({ headers: new Headers(
                                { 'Content-Type': 'application/json'})});


  getAuthor(id:string) : Observable<any>  {
      return this.getEntity("/get-author/" + id,
              this.extractPublicationData).pipe(map(r => {
              return r;
            }));      
 }

  private getEntity(resource: string, extractDataFunc: any) : Observable<AuthorPublication> {
      return this.http.get(this.base + resource, this.options)
        .pipe(map(extractDataFunc))
  }

  private extractPublicationData(res: Response) {
      let body = res.json();
      var resultList = [];
      debugger;
      body.publicationList.forEach(el => {      
            resultList.push(new AuthorPublication(el.title, el.body, null));      
     });

    return resultList;
  }
}
