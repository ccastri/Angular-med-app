import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';
import { Hospital } from '../models/hospital.model';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class SearchsService {
  constructor(private http: HttpClient) {}
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  private usersSwitch(results: any[]): User[] {
    return results.map(
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
  }
  private hospitalsSwitch(results: any[]): Hospital[] {
    return results.map(
      (hospital) =>
        new Hospital(
          hospital.name,
          hospital._id,

          hospital.img,
          hospital.user
        )
    );
  }
  private doctorsSwitch(results: any[]): Doctor[] {
    return results.map(
      (doctor) =>
        new Doctor(
          doctor.name,
          doctor._id,

          doctor.img,
          doctor.hospital,
          doctor.user
        )
    );
  }
  globalSearch(pattern: string) {
    const url = `${base_url}/all/${pattern}`;
    return this.http.get(url, this.headers);
  }

  search(type: 'users' | 'doctors' | 'hospitals', pattern: string) {
    const url = `${base_url}/all/collection/${type}/${pattern}`;
    return this.http.get<any[]>(url, this.headers).pipe(
      map((res: any) => {
        switch (type) {
          case 'users':
            return this.usersSwitch(res.results);
            break;
          case 'hospitals':
            return this.hospitalsSwitch(res.results);
          case 'doctors':
            return this.doctorsSwitch(res.results);

          default:
            return [];
        }
      })
    );
  }
}
