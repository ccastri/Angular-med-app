import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      title: 'Dashboard!!!',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Principal', url: '/' },
        { title: 'Progreso del tratamiento', url: 'progress' },
        { title: 'Tus predicciones', url: 'promises' },
        { title: 'Citas', url: 'rxjs' },
        { title: 'Estadisticas', url: 'chart1' },
      ],
    },
  ];
  constructor() {}
}
