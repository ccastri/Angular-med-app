import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';
import { LoadUser } from '../interfaces/load-users.interface';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

import { User } from '../models/user.model';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public auth2: any;
  public user: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get uid(): string {
    return this.user.uid || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  googleInit() {
    return new Promise((resolve: any) => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id:
            '173031288157-04e11udn1m1lrqkv4k0bg8h9u8oqf2jf.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  tokenValidation(): Observable<boolean> {
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          console.log(resp);
          const { email, google, name, role, img = '', uid } = resp.user;
          this.user = new User(name, email, img, '', google, role, uid);

          console.log(resp.user);
          localStorage.setItem('token', resp.token); //New token version stored in resp.token
          return true;
        }),
        // map((resp: any) => true),
        catchError((err) => of(false)) //atrapa el error que viene del pipe con la peticion y deuelve un observable
      );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  updateProfile(data: { email: string; name: string; role: string }) {
    return this.http.put(`${base_url}/users/${this.uid}`, data, this.headers);
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }
  loadUsers(since: number = 0) {
    // base_url = localhost:3000/api/users?since=0
    const url = `${base_url}/users?since=${since}`;
    return this.http.get<LoadUser>(url, this.headers).pipe(
      map((resp) => {
        const user = resp.user.map(
          (user) =>
            new User(
              user.name,
              user.email,
              user.img,
              '',
              user.google,
              user.role,
              user.uid
            )
        );
        return {
          total: resp.total,
          user,
        };
        // console.log(resp);
      })
    );
  }
  deleteUser(user: User) {
    const url = `${base_url}/users/${user.uid}`;
    return this.http.delete(url, this.headers);
  }

  saveUser(data: User) {
    console.log(data);
    return this.http.put(`${base_url}/users/${data.uid}`, data, this.headers);
  }
}
