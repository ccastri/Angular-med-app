import { NgModule } from '@angular/core';

import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { DoctorComponent } from './mainteneance/doctors/doctor.component';
import { DoctorsComponent } from './mainteneance/doctors/doctors.component';
import { HospitalsComponent } from './mainteneance/hospitals/hospitals.component';
import { UsersComponent } from './mainteneance/users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { SearchComponent } from './search/search.component';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  {
    path: 'progress',
    component: ProgressComponent,
    data: { title: 'Progress' },
  },
  {
    path: 'fanances',
    component: Grafica1Component,
    data: { title: 'Mis Finanzas' },
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    data: { title: 'Tema' },
  },
  {
    path: 'search/:pattern',
    component: SearchComponent,
    data: { title: 'Buscar' },
  },
  {
    path: 'diagnostic',
    component: PromisesComponent,
    data: { title: 'Mis Diagnósticos' },
  },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { title: 'My profile' },
  },
  //Paths vacios redirect to dashboard
  // Mainteneance
  // Rutas de Admin
  {
    path: 'users',
    canActivate: [AdminGuard],
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
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
