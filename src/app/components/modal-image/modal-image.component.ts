import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [],
})
export class ModalImageComponent implements OnInit {
  // public hideModal: boolean = false;
  public uploadFile: File;
  public imgTemp: any = null;
  constructor(
    public modalImageService: ModalImageService,
    public fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.imgTemp = null;
    this.modalImageService.closeModal();
  }
  changeImage(file: File) {
    this.uploadFile = file;

    if (!file) {
      return (this.imgTemp = null);
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => (this.imgTemp = reader.result);
    // console.log(file);
  }

  uploadImg() {
    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileUploadService
      .updatePhoto(this.uploadFile, type, id)
      .then((img) => {
        Swal.fire('guardado', 'changes has been saved', 'success');
        this.modalImageService.newImg.emit(img);
        this.closeModal();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire('Error', 'Image could not be uploaded', 'error');
      });
  }
}
