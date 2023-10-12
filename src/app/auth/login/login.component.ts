import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
// Esto era requerido por la version 1 de OAUTH (ACTUALIZAR LOGIN GOOGLE)
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
// STATE FOR CONFIRMING FORM SUBMISSION AND OAUTH login too.
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  // Public property for oauth
  // public auth2: any;
  // lOGIN FORM WILL CATCH THE LAST SUCCESSFUL LOGIN ATEMPT EMAIL'S
  // ACOUNT OR AND EMPTY STRING IF THERE IS NOTHING
  public loginForm: any = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ], // Correo existente en localStorage || string vacio (evitar el null)
    password: ['', Validators.required],
    rememberMe: [false],
  });
  //
  //!  Properties (modules, methods, services and or third party libraries) used in this component:
  //!  formBuilder, userService and router
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    // Google OAUTH html button embedding the provider
    // this.renderButton();
  }
  //manejo del formulario
  // ! First method: login a new user:
  // !1. The formSubmitted flag turns on
  // !2. Log the fields values
  // !3. Return nothing if the form is invalid
  // !4. Call the login method from the userService to asynchronously login the user,
  // !   while saving the email in localStorage if requested by the user
  // !   (when user is logged in and looks for root path it'll be redirected to /dashboard)
  // !if any errors shows them up in the screen
  login() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.userService.login(this.loginForm.value).subscribe({
      next: (resp) => {
        console.log(resp);

        if (this.loginForm.get('rememberMe').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }
        // navegar al dashboard
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      },
    });
  }

  //! Google Login  finna do maintenance and update it to 2.0 then I can continue growing up the fhir api with
  //! user(patient)
  //! root(admin: institution)
  //! practitioner(to be added)

  //   renderButton() {
  //     gapi.signin2.render('my-signin2', {
  //       scope: 'profile email',
  //       width: 240,
  //       height: 50,
  //       longtitle: true,
  //       theme: 'dark',
  //     });
  //     this.startApp();
  //   }
  //   async startApp() {
  //     await this.userService.googleInit();
  //     this.auth2 = this.userService.auth2;
  //     this.attachSignin(document.getElementById('my-signin2'));
  //   }
  //   attachSignin(element: any) {
  //     this.auth2.attachClickHandler(
  //       element,
  //       {},
  //       (googleUser: any) => {
  //         const id_token = googleUser.getAuthResponse().id_token;
  //         // console.log(id_token);
  //         this.userService.loginGoogle(id_token).subscribe((resp) => {
  //           // navegar al dashboard
  //           this.ngZone.run(() => {
  //             this.router.navigateByUrl('/');
  //           });
  //         });
  //       },
  //       (error: any) => {
  //         alert(JSON.stringify(error, undefined, 2));
  //       }
  //     );
  //   }
}

// function signOut() {
//   var auth2 = gapi.auth2.getAuthInstance();
//   auth2.signOut().then(function () {
//     console.log('User signed out.');
//   });
