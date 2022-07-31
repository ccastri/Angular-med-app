import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { AuthGuard } from '../guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './mainteneance/users/users.component';
import { HospitalsComponent } from './mainteneance/hospitals/hospitals.component';
import { DoctorsComponent } from './mainteneance/doctors/doctors.component';
import { DoctorComponent } from './mainteneance/doctors/doctor.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title: 'Progress' },
      },
      {
        path: 'chart1',
        component: Grafica1Component,
        data: { title: 'Charts' },
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { title: 'Theme' },
      },
      {
        path: 'promises',
        component: PromisesComponent,
        data: { title: 'Promises' },
      },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'My profile' },
      },
      //Paths vacios redirect to dashboard
      // Mainteneance
      {
        path: 'users',
        component: UsersComponent,
        data: { title: 'Users' },
      },
      {
        path: 'hospitals',
        component: HospitalsComponent,
        data: { title: 'Hospitals' },
      },
      {
        path: 'doctors',
        component: DoctorsComponent,
        data: { title: 'Doctors' },
      },
      {
        path: 'doctor/:id',
        component: DoctorComponent,
        data: { title: 'Doctor' },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
