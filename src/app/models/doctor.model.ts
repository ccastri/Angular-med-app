import { Hospital } from './hospital.model';

interface _DoctorUser {
  _id: string;
  name: string;
  img?: string;
}
export class Doctor {
  constructor(
    public name: string | any,
    public _id?: string | '',
    public img?: string | any,
    public hospital?: Hospital,
    public user?: _DoctorUser
  ) {}
}
