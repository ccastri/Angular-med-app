import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
//! Users (patient) guard implementation:
// !If the token didn't get valid always go to the /login
// !It wont load no dashboard till gets authenticated
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private userService: UserService, private router: Router) {}
  canLoad(
    route: Route,
    segments: import('@angular/router').UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.userService.tokenValidation().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          // this.router.navigate(['/login']);
          this.router.createUrlTree(['/login']);
        }
      })
    );
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.tokenValidation().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          // this.router.navigate(['/login']);
          this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}
