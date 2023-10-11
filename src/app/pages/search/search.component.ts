import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { SearchsService } from 'src/app/services/searchs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  public users: User[] = [];
  public hospitals: Hospital[] = [];
  public doctors: Doctor[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private searchsService: SearchsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ pattern }) =>
      this.globalSearch(pattern)
    );
  }
  globalSearch(pattern: string) {
    this.searchsService.globalSearch(pattern).subscribe((res: any) => {
      console.log(res);
      this.users = res.users;
      this.hospitals = res.hospitals;
      this.doctors = res.doctors;
    });
  }
}
