import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';
import { Hospital } from '../models/hospital.model';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  public doctor: Doctor[] = [];
  public hospitals: Hospital[] = [];
  constructor(private http: HttpClient, private router: Router) {}
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

  loadDoctor(): Observable<Doctor[]> {
    // base_url = localhost:3000/api/users?since=0
    const url = `${base_url}/doctors`; //?since=${since}`;
    return this.http
      .get<{ ok: boolean; doctors: Doctor[] }>(url, this.headers)
      .pipe(map((res: { ok: boolean; doctors: Doctor[] }) => res.doctors));
  }
  getDoctorById(id: string): Observable<Doctor> {
    // base_url = localhost:3000/api/users?since=0
    const url = `${base_url}/doctors/${id}`; //?since=${since}`;
    return this.http
      .get<{ ok: boolean; doctor: Doctor }>(url, this.headers)
      .pipe(map((res: { ok: boolean; doctor: Doctor }) => res.doctor));
  }
  createDoctor(doctor: { name: string; hospital: string }) {
    // base_url = localhost:3000/api/users?since=0
    const url = `${base_url}/doctors`; //?since=${since}`;
    return this.http.post(url, doctor, this.headers);
  }
  updateDoctor(doctor: Doctor) {
    // base_url = localhost:3000/api/users?since=0
    const url = `${base_url}/doctors/${doctor._id}`; //?since=${since}`;
    return this.http.put(url, doctor, this.headers);
  }
  deleteDoctor(_id: string) {
    // base_url = localhost:3000/api/users?since=0
    const url = `${base_url}/doctors/${_id}`; //?since=${since}`;
    return this.http.delete(url, this.headers);
  }
}
