import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})

//! AuthGuard will show you the full sidebar admin panel
// It's logging a 'adminguard' string to let devs now it's working
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userService.role === 'ADMIN_ROLE') {
      console.log('adminguard');
      return true;
    } else {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
  }
}
