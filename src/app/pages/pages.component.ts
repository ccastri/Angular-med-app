import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions(): any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  
  constructor(private SettingsService: SettingsService ) { }

  ngOnInit(): void {
    customInitFunctions();
    // localStorage.setItem('theme', url); //Me aseguro de que en localStorage siempre theme tenga un valor

  

  }

}
