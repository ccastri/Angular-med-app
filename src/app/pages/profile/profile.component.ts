import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public user: User;
  public uploadFile: File;
  public imgTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }
  updateProfile() {
    console.log(this.profileForm.value);
    this.userService.updateProfile(this.profileForm.value).subscribe(
      () => {
        // console.log(resp);
        const { name, email } = this.profileForm.value;
        this.user.name = name;
        this.user.email = email;
        Swal.fire('guardado', 'changes has been saved', 'success');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  changeImage(file: File) {
    this.uploadFile = file;

    if (!file) {
      return (this.imgTemp = null);
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => (this.imgTemp = reader.result);
  }

  uploadImg() {
    this.fileUploadService
      .updatePhoto(this.uploadFile, 'users', this.user.uid)
      .then((img) => {
        this.user.img = img;
        Swal.fire('guardado', 'changes has been saved', 'success');
      })
      .catch((err) => {
        console.log(err);
        Swal.fire('Error', 'Image could not be uploaded', 'error');
      });
  }
}
