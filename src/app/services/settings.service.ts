import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector( '#theme');
  constructor() { 
    const url = localStorage.getItem('theme') || "./assets/css/colors/default-dark.css"; // con el get item leo el tema y como puede venir vacia la property asigno un default css
    this.linkTheme?.setAttribute('href', url);
   
  }

  changeTheme( theme: string){
    
    const url = `./assets/css/colors/${ theme }.css`;

    this.linkTheme?.setAttribute('href', url)
    localStorage.setItem('theme', url); //almaceno el theme y url en el local storage. leo theme y le pongo el url al theme
    this.checkCurrentTheme();  
  }
  checkCurrentTheme() {
  
    const links = document.querySelectorAll('.selector');
    links.forEach( elem => { //Barre elementos de links y expone el html
      // CALLBACK
      elem.classList.remove('working'); //remueve la seleccion
      const btnTheme = elem.getAttribute('data-theme'); //selecciona el tema en el a
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`; //Selecciona etiqueta HTML (URL)
      const currentTheme = this.linkTheme?.getAttribute('href'); //Devuelve el URL  del tema seleccionado actualmente

      // Si la eqtiqueta HTML seleccionada corresponde al  atributo href del tema seleccionado por link, añadale el Class Working para mover el chulo
        if (btnThemeUrl === currentTheme ) {
          elem.classList.add('working');
        }
      

    });
  }
}
