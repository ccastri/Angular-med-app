import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SearchsService } from 'src/app/services/searchs.service';
// import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  public user: User;
  // public user : User

  constructor(
    private userService: UserService,
    private router: Router // private searchService: SearchsService
  ) {
    this.user = userService.user;
  }
  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }
  search(pattern: string) {
    // this.searchService.globalSearch(pattern);
    console.log(pattern);
    this.router.navigateByUrl(`/dashboard/search/${pattern}`);
  }
}
