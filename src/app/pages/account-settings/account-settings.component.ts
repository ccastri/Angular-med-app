import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
  
 
 

  constructor(private settingService: SettingsService) { }

  ngOnInit(): void {
    this.settingService.checkCurrentTheme();
  }
   // #recibo el color y selecciono por id asignandolo a una constante... ? porque puede ser null
  changeTheme( theme: string){
    
    this.settingService.changeTheme( theme);

  }


}
