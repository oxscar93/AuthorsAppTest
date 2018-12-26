import { Injectable }             from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';
import { PublicationService }  from './publication.service';
import { AuthorPublication, AuthorPublicationResolve } from './author-publication';


@Injectable({
  providedIn: 'root',
})
export class PublicationResolverService implements Resolve<AuthorPublicationResolve> {

  constructor(private sc: PublicationService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AuthorPublicationResolve> | Observable<never> {
    let id= route.queryParams['authorId']
    let name= route.queryParams['authorName']

    return this.sc.getPublicationList(id).pipe(
      mergeMap(publicationList => {
        if (publicationList) {
          return of(new AuthorPublicationResolve(publicationList, id, name));
        } else { 
          return EMPTY;
        }
      })
    );
  }
}
