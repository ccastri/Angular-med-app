import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService } from 'src/app/services/searchs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [],
})
export class DoctorsComponent implements OnInit {
  public loading: boolean = true;
  public doctors: Doctor[] = [];
  public doctorsTemp: Doctor[] = [];

  constructor(
    private doctorService: DoctorService,
    private searchService: SearchsService,
    public modalImageService: ModalImageService
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  search(pattern: string) {
    if (pattern.length === 0) {
      return (this.doctors = this.doctorsTemp);
    }
    this.searchService.search('doctors', pattern).subscribe((resp) => {
      this.doctors = resp as Doctor[];
    });
  }

  loadDoctors() {
    this.loading = true;

    this.doctorService.loadDoctor().subscribe((doctors) => {
      console.log(doctors);
      this.loading = false;
      this.doctors = doctors;
    });
  }
  // async addHospital() {
  //   const { value = '' } = await Swal.fire<string>({
  //     text: 'Add the name from the new hospital',
  //     title: 'Create hospital',
  //     input: 'text',
  //     inputPlaceholder: `Hospital's name`,
  //     showCancelButton: true,
  //   });
  //   if (value.trim().length > 0) {
  //     this.doctorService.createDoctor(value).subscribe((res: any) => {
  //       console.log(res);
  //       this.doctors.push(res.hospital);
  //     });
  //   }

  //   console.log(value);
  // }
  openModal(doctor: Doctor) {
    // console.log(hodoctorspital);
    this.loadDoctors();
    this.modalImageService.openModal('doctors', doctor._id, doctor.img);
  }

  deleteDoctor(doctor: Doctor) {
    Swal.fire({
      title: 'Do you want to delete this user?',
      text: `You are about to delete ${doctor.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.deleteDoctor(doctor._id).subscribe((res) => {
          this.loadDoctors();
          Swal.fire(
            'User has been deleted',
            `${doctor.name} has been deleted successfully`,
            'success'
          );
        });
      }
    });
  }
}
