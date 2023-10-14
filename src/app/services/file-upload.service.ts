import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}
  // ! How to get a picture updated:
  // ! This method works with 3 variables:
  // ! file with a File native js type (stores the binary data)
  // ! the type of user (internally, type means name; the name of the folder to store the file image)
  // ! the ID of the used in the frontend
  // ! Try to convert the File into a formData json object
  // ! Send the PUT request to the back (setting the headers up with token from localStorage):
  // ! Body contains the Image in json format
  async updatePhoto(
    file: File | any,
    type: 'users' | 'doctors' | 'hospitals',
    id: string | any
  ) {
    try {
      const url = `${base_url}/uploads/${type}/${id}`;
      const formData = new FormData();
      formData.append('img', file);
      console.log(file);
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData,
      });

      // debugger;
      const data = await resp.json();

      if (data.ok) {
        return data.fileName;
      } else {
        console.log(data.msg);
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
