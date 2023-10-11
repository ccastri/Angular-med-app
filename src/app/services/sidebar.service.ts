import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public menu = [];
  loadMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }
}
//   menu: any[] = [
//     {
//       title: 'Dashboard',
//       icon: 'mdi mdi-gauge',
//       submenu: [
//         { title: 'Principal', url: '/' },
//         { title: 'Progreso del tratamiento', url: 'progress' },
//         { title: 'Tus predicciones', url: 'promises' },
//         { title: 'Citas', url: 'rxjs' },
//         { title: 'Estadisticas', url: 'chart1' },
//       ],
//     },
//     {
//       title: 'Maintenance',
//       icon: 'mdi mdi-folder-lock-open',
//       submenu: [
//         { title: 'Users', url: 'users' },
//         { title: 'Doctors', url: 'doctors' },
//         { title: 'Hospitals', url: 'hospitals' },
//       ],
//     },
//   ];
//   constructor() {}
// }
