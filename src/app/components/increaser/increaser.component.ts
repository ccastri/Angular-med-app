import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';


@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: [
  ]
})
export class IncreaserComponent implements OnInit {
  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`; //Concateno el btn a btnClass para no poner btn btn-primary HTML
  }

//  @Input() progreso: number = 50;
 @Input('valor') progreso: number = 50; //se cambia el argumento por [valor]
 @Input() btnClass: string = 'btn-primary';

 @Output('valor') exitValue: EventEmitter<number> = new EventEmitter();
  
  
  changeValue ( value: number ) {

    if (this.progreso + value > 100 ) {
      this.exitValue.emit(100);
      return;
    }
    if (this.progreso + value < 0) {
      this.exitValue.emit(0);
      return;
    }
    // otra alternativa:
    // if (this.progreso + valor <= 100 && this.progreso + valor >= 0) {
      // this.progreso += valor;
      // }
      this.progreso = this.progreso + value;
      this.exitValue.emit(this.progreso);
  }

  onChange ( newValue: number ){

    if(newValue >= 100 ){
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    this.exitValue.emit(this.progreso);
  }

}
