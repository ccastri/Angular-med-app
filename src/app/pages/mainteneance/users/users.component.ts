import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { User } from 'src/app/models/user.model';

import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService } from 'src/app/services/searchs.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [],
})
export class UsersComponent implements OnInit {
  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public since: number = 0;
  public loading: boolean = true;

  constructor(
    private userService: UserService,
    private searchService: SearchsService,
    private modalImageService: ModalImageService
  ) {}

  ngOnInit(): void {
    this.loadUsers();

    this.modalImageService.newImg
      .pipe(delay(100))
      .subscribe((img) => this.loadUsers());
  }

  loadUsers() {
    this.loading = true;
    this.userService.loadUsers(this.since).subscribe(({ total, user }) => {
      this.totalUsers = total;
      this.users = user;
      this.usersTemp = user;
      this.loading = false;
    });
  }

  changePage(value: number) {
    this.loading = true;
    this.since += value;
    if (this.since < 0) {
      this.since = 0;
    } else if (this.since >= this.totalUsers) {
      this.since -= value;
    }
    this.loadUsers();
  }

  search(pattern: string) {
    if (pattern.length === 0) {
      return (this.users = this.usersTemp);
    }
    this.searchService.search('users', pattern).subscribe((resp) => {
      this.users = resp as User[];
    });
  }
  deleteUser(user: User) {
    if (user.uid === this.userService.uid) {
      return Swal.fire('Error', 'Your access is blocked', 'error');
    }

    Swal.fire({
      title: 'Do you want to delete this user?',
      text: `You are about to delete ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user).subscribe((res) => {
          this.loadUsers();
          Swal.fire(
            'User has been deleted',
            `${user.name} has been deleted successfully`,
            'success'
          );
        });
      }
    });
  }
  changeRole(updatedUser: User) {
    this.userService.saveUser(updatedUser).subscribe((res) => {
      console.log(res);
    });
  }

  openModal(user: User) {
    console.log(user);
    this.modalImageService.openModal('users', user.uid, user.img);
  }
}
