import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import {RouterModule } from '@angular/router';


import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const AUTH_COMPONENT = [
  LoginComponent,
  RegisterComponent  

]; 

@NgModule({
  declarations: [AUTH_COMPONENT
  ],
  exports: [
    AUTH_COMPONENT
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class AuthModule { }
