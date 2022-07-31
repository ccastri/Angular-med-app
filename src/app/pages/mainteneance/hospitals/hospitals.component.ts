import { delay } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';
import { SearchsService } from 'src/app/services/searchs.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [],
})
export class HospitalsComponent implements OnInit {
  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  public hospitalsTemp: Hospital[] = [];

  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImageService,
    private searchService: SearchsService
  ) {}

  ngOnInit(): void {
    this.loadHospitals();

    this.modalImageService.newImg
      .pipe(delay(100))
      .subscribe((img) => this.loadHospitals());
  }

  search(pattern: string) {
    if (pattern.length === 0) {
      return this.loadHospitals();
    }
    this.searchService.search('hospitals', pattern).subscribe((resp) => {
      this.hospitals = resp;
    });
  }

  loadHospitals() {
    // this.loading = true;

    this.hospitalService.loadHospitals().subscribe((hospitals) => {
      console.log(hospitals);
      this.loading = false;
      this.hospitals = hospitals;
    });
  }

  saveHospital(hospital: Hospital) {
    this.hospitalService
      .updateHospital(hospital._id, hospital.name)
      .subscribe((res) => {
        Swal.fire('Updated', hospital.name, 'success');
      });
  }
  removeHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital._id).subscribe((res) => {
      this.loadHospitals();
      Swal.fire('Deleted', hospital.name, 'success');
    });
  }
  async addHospital() {
    const { value = '' } = await Swal.fire<string>({
      text: 'Add the name from the new hospital',
      title: 'Create hospital',
      input: 'text',
      inputPlaceholder: `Hospital's name`,
      showCancelButton: true,
    });
    if (value.trim().length > 0) {
      this.hospitalService.createHospital(value).subscribe((res: any) => {
        console.log(res);
        this.hospitals.push(res.hospital);
      });
    }

    console.log(value);
  }

  openModal(hospital: Hospital) {
    console.log(hospital);
    this.loadHospitals();
    this.modalImageService.openModal('hospitals', hospital._id, hospital.img);
  }
}
