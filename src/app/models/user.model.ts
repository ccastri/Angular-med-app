import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class User {
  constructor(
    public name: string | any,
    public email: string,
    public img?: string | '',
    public password?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string | ''
  ) {}
  get imageUrl() {
    if (!this.img) {
      console.log(this.img);
      return `${base_url}/uploads/users/no-image`;
    } else if (this.img.includes('https')) {
      return this.img;
    } else if (this.img) {
      return `${base_url}/uploads/users/${this.img}`;
    } else {
      return `${base_url}/uploads/users/no-image`;
    }
  }
}
