import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreaserComponent } from './increaser/increaser.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { ChartsModule } from 'ng2-charts';
import { ModalImageComponent } from './modal-image/modal-image.component';

@NgModule({
  declarations: [IncreaserComponent, DonaComponent, ModalImageComponent],
  exports: [
    IncreaserComponent,
    DonaComponent, //necesito exportarlo para usarlo por fuera
    ModalImageComponent,
  ],
  imports: [CommonModule, FormsModule, ChartsModule],
})
export class ComponentsModule {}
