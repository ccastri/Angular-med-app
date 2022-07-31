import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './doctor.component.html',
  styles: [],
})
export class DoctorComponent implements OnInit {
  public loading: boolean = true;
  public hospitals: Hospital[] = [];

  public selectedHospital: Hospital;
  public selectedDoctor: Doctor;
  public doctorForm: FormGroup;

  constructor(
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.doctorService.getDoctorById
    this.activatedRoute.params.subscribe(({ id }) => this.loadDoctor(id));

    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });
    this.loadHospitals();

    this.doctorForm
      .get('hospital')
      .valueChanges.pipe(delay(100))
      .subscribe((hospitalId) => {
        this.selectedHospital = this.hospitals.find(
          (h) => h._id === hospitalId
        );
        console.log(this.selectedHospital);
      });
  }
  saveDoctor() {
    const { name } = this.doctorForm.value;
    // if (!this.selectedDoctor) {
    //   return;
    // }
    this.doctorService
      .createDoctor(this.doctorForm.value)
      .subscribe((res: any) => {
        if (this.selectedDoctor) {
          //Update
          const data = {
            ...this.doctorForm.value,
            _id: this.selectedDoctor._id,
          };
          this.doctorService.updateDoctor(data).subscribe((res) => {
            Swal.fire(
              'Updated',
              `${name} has been modified successfully`,
              'success'
            );
            // this.router.navigateByUrl(`/dashboard/doctor/${res.doctor._id}`);
          });
        } else {
          //Create
          this.doctorService
            .createDoctor(this.doctorForm.value)
            .subscribe((re: Doctor) => {
              Swal.fire(
                'Created',
                `${name} was created successfully`,
                'success'
              );
              this.router.navigateByUrl(`/dashboard/doctor/${res.doctor._id}`);
            });
        }
      });
  }

  loadHospitals() {
    // this.loading = true;

    this.hospitalService.loadHospitals().subscribe((hospitals: Hospital[]) => {
      console.log(hospitals);
      // this.loading = false;
      this.hospitals = hospitals;
    });
  }
  loadDoctor(id: string) {
    if (id === 'new') {
    }
    this.doctorService.getDoctorById(id).subscribe((doctor) => {
      if (!doctor) {
        return this.router.navigateByUrl(`/dashboard/doctors`);
      } else {
        this.selectedDoctor = doctor;
        const {
          name,
          hospital: { _id },
        } = doctor;
        this.doctorForm.setValue({ name, hospital: _id });
      }
    });
  }
}
