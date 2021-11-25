import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsers().then( users => {
      console.log(users);
    })
    // const promise = new Promise( (resolve, reject) => {
    //   if ( false ){ //condicional para manejo de errores, sin manejar la excepcion aparece un error de uncaught promise
    //     resolve('Hello world');
    //   } else {
    //     reject('Algo salio mal');
    //   }
    // });

    // promise.then( (message) =>{ //este callback es asincrono. si le pongo message, este arg me recibe el resolve
    //   console.log(message)
    // })
    // .catch(err => console.log('error en mi promesa', err)) //manejo de error: lo captura (catch) y le concatena lo que hay en reject
    // console.log('Fin del Init');
  }

  getUsers(){
  // si creo una nueva promesa puedo ponerle return para que devuelva resolve (res)
  return  new Promise (res => {
      
      fetch('https://reqres.in/api/user')
        .then( resp => resp.json())
        .then( body => console.log(body.data));
    }); 
      
  }
}
