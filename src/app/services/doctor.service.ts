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
  //! You'd need both object shapes to make the doctor's crud operations happen
  public doctor: Doctor[] = [];
  public hospitals: Hospital[] = [];
  constructor(private http: HttpClient, private router: Router) {}
  // !Quite oftenly (when doctor is authenticated) the auth token will be gathered from localStorage
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  // ! The 'x-token' ('Bearer' commonly) will be received from the headers request
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

  // !load Doctors:
  // !Check headers for the token and the authorization token
  //! make a get request to the /doctors endpoint so
  //! It can load them up in a list
  loadDoctor(): Observable<Doctor[]> {
    // base_url = localhost:3000/api/users?since=0
    const url = `${base_url}/doctors`; //?since=${since}`;
    return this.http
      .get<{ ok: boolean; doctors: Doctor[] }>(url, this.headers)
      .pipe(map((res: { ok: boolean; doctors: Doctor[] }) => res.doctors));
  }
  // ! Get a Doctor by ID
  // !Check headers for the token and the authorization token
  // ! the ID is gathered as a url parameter
  // !
  getDoctorById(id: string): Observable<Doctor> {
    // base_url = localhost:3000/api/users?since=0
    const url = `${base_url}/doctors/${id}`; //?since=${since}`;
    return this.http
      .get<{ ok: boolean; doctor: Doctor }>(url, this.headers)
      .pipe(map((res: { ok: boolean; doctor: Doctor }) => res.doctor));
  }
  //! POST a doctor:
  //! You'd need the name and a hospital to relate the physician
  //! Send data back to the backend and the headers with the session token And the JWT
  createDoctor(doctor: { name: string; hospital: string }) {
    // base_url = localhost:3000/api/users?since=0
    const url = `${base_url}/doctors`; //?since=${since}`;
    return this.http.post(url, doctor, this.headers);
  }
  //! PUT a doctor:
  //! You'd use the selected doctor's id from the DB to add it as url param
  //! Send data back to the backend and the headers with the session token And the JWT
  updateDoctor(doctor: Doctor) {
    // base_url = localhost:3000/api/users?since=0
    const url = `${base_url}/doctors/${doctor._id}`; //?since=${since}`;
    return this.http.put(url, doctor, this.headers);
  }
  //! DELETE a doctor:
  //! You'd need the _id (private from DB) to relate the physician
  //! Send request back to the backend and the headers with the session token And the JWT
  deleteDoctor(_id: string) {
    // base_url = localhost:3000/api/users?since=0
    const url = `${base_url}/doctors/${_id}`; //?since=${since}`;
    return this.http.delete(url, this.headers);
  }
}
