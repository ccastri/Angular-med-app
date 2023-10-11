import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { User } from '../models/user.model';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  public hospital: Hospital;
  public user: User;

  constructor(private http: HttpClient, private router: Router) {}

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

  // .pipe(
  //     map((resp) => {
  //       const hos = resp.user.map(
  //         (user) =>
  //           new User(
  //             user.name,
  //             user.email,
  //             user.img,
  //             '',
  //             user.google,
  //             user.role,
  //             user.uid
  //           )
  //       );
  //       return {
  //         total: resp.total,
  //         user,

  loadHospitals(): Observable<Hospital[]> {
    // base_url = localhost:3000/api/users?since=0
    const url = `${base_url}/hospitals`; // ?since=${since}`;
    return this.http
      .get<{ ok: boolean; hospitals: Hospital[] }>(url, this.headers)
      .pipe(
        map((res: { ok: boolean; hospitals: Hospital[] }) => res.hospitals)
      );
    //       };
    //     })
    //   );
  }
  createHospital(name: string) {
    // base_url = localhost:3000/api/users?since=0
    const url = `${base_url}/hospitals`; //?since=${since}`;
    return this.http.post(url, { name }, this.headers);
  }
  updateHospital(_id: string, name: string) {
    // base_url = localhost:3000/api/users?since=0
    const url = `${base_url}/hospitals/${_id}`; //?since=${since}`;
    return this.http.put(url, { name }, this.headers);
  }
  deleteHospital(_id: string) {
    // base_url = localhost:3000/api/users?since=0
    const url = `${base_url}/hospitals/${_id}`; //?since=${since}`;
    return this.http.delete(url, this.headers);
  }
}
