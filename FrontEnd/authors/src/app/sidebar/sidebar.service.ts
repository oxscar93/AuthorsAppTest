import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Author } from './author';
import { environment } from 'src/environments/environment';

@Injectable()
export class SidebarService {
  constructor(private http:Http) { }

  base = environment.baseServiceUrl;
  options = new RequestOptions({ headers: new Headers(
                                { 'Content-Type': 'application/json'})});


  getAuthorList() : Observable<any>  {
      return this.getEntity("/get-author-list",
              this.extractAuthorData).pipe(map(r => {
              return r;
            }));      
 }

  private getEntity(resource: string, extractDataFunc: any) : Observable<Author> {
      return this.http.get(this.base + resource, this.options)
        .pipe(map(extractDataFunc))
  }

  private extractAuthorData(res: Response) {
      let body = res.json();
      var resultList = [];
      
      body.results.forEach(el => {  
        resultList.push(new Author(el.id, el.name, el.email)); 
     });

    return resultList;
  }
}
