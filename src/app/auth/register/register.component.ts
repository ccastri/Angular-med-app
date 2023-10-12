import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // ! To confirm the form got submitted correctly
  public formSubmitted = false;
  // !The form fields ['defaultValue', validator] +  2 passwords coincidence validation
  public registerForm: any = this.fb.group(
    {
      name: ['elcastri', Validators.required],
      email: ['elcastri1@hotmail.com', [Validators.required, Validators.email]],
      password: ['elcastri', Validators.required],
      password2: ['elcastri', Validators.required],
      terms: [true, Validators.required],
    },
    {
      validators: this.matchingPasswords('password', 'password2'),
    }
  );
  //!  Properties (modules, methods, services and or third party libraries) used in this component:
  //!  formBuilder, userService and router
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}
  // ! First method: create a new user:
  // !1. The formSubmitted flag turns on
  // !2. Log the fields values
  // !3. Return nothing if the form is invalid
  // !4. Call the createUser method fron the userService to asynchronously create
  // !The user and then navigate to the dashboard
  // !(when user is logged in and looks for root path it'll be redirected to /dashboard)
  // !if any errors shows them up in the screen
  createUser() {
    this.formSubmitted = true; //Confirmo el envio del formulario
    // console.log(this.registerForm.value)
    console.log(this.registerForm);

    if (this.registerForm.invalid) {
      return;
    }
    // Posting sign up body values
    this.userService.createUser(this.registerForm.value).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      },
    });
  }
  // !Validators:
  // !if any of the fields in registerForms is not valid and the user've clicked on submit already
  // ! raise true and show the validation warning below the terms and conditions checkmark field
  // ! if not live it alone
  notValidField(field: string): boolean {
    if (this.registerForm.get(field).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
  //! Pasword coincidence validation:
  //! Extract values from both pass fields
  //! If they don't match raise validation error
  //! Else live it alone
  notValidPassword() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
  //! Pick the terms and conditions
  //! If not and for submission got triggered raise the validation error
  acceptTerms() {
    return !this.registerForm.get('terms').value && this.formSubmitted; //si el check de terms esta en false y ya se presiono submit...
  }
  // ! Password validation (from formBuilder):
  // ! Internal doublechecking passwords are valid
  // ! if not doesNotMatch fb flag gets raised and validation error after all
  matchingPasswords(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control: any = formGroup.get(pass1Name);
      const pass2Control: any = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ doesNotMatch: true });
      }
    };
  }
}
