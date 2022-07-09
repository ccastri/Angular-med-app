import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
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

  constructor(private userService: UserService) {
    this.user = userService.user;
  }
  logout() {
    this.userService.logout();
    // this.router.navigateByUrl('/login');
  }
}
