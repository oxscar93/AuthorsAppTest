import { Injectable }             from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';
import { PublicationBrowserResolver } from './publication-browser';
import { PublicationBrowserService } from './publication-browser.service';



@Injectable({
  providedIn: 'root',
})
export class PublicationBrowserResolverService implements Resolve<PublicationBrowserResolver> {

  constructor(private sc: PublicationBrowserService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PublicationBrowserResolver> | Observable<never> {
    let title= route.queryParams['title']
    return this.sc.getPublicationListByTitle(title, undefined).pipe(
      mergeMap(res => {
        if (res) {
          return of(new PublicationBrowserResolver(res, title));
        } else { 
          return EMPTY;
        }
      })
    );
  }
}
