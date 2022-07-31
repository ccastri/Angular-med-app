import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class ModalImageService {
  private _hideModal: boolean = true;

  public type: 'users' | 'doctors' | 'hospitals';
  public id: string;
  public img: string;

  public newImg: EventEmitter<string> = new EventEmitter<string>();

  get hideModal() {
    return this._hideModal;
  }
  // http://localhost:3000/api/uploads/users/3ec7b1c2-97c2-47b8-8a3c-4349c6a8f074.jpg
  openModal(
    type: 'users' | 'doctors' | 'hospitals',
    id: string,
    img: string = 'no-img'
  ) {
    this._hideModal = false;
    this.type = type;
    this.id = id;
    // this.img = 'no-img';
    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/uploads/${type}/${img}`;
    }
    console.log(this.img);
  }
  closeModal() {
    this._hideModal = true;
  }
  constructor() {}
}
