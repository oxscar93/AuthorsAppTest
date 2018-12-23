import { Injectable }             from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';
import { PublicationService }  from './publication.service';
import { AuthorPublication } from './author-publication';


@Injectable({
  providedIn: 'root',
})
export class PublicationResolverService implements Resolve<Array<AuthorPublication>> {

  constructor(private sc: PublicationService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<AuthorPublication>> | Observable<never> {
    let id= route.queryParams['authorId']
    return this.sc.getAuthor(id).pipe(
      mergeMap(publicationList => {
        if (publicationList) {
          return of(publicationList);
        } else { 
          return EMPTY;
        }
      })
    );
  }
}
