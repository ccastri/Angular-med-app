import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {
  public labels1: string[] = [
    "Alzheimer's disease",
    'Mild cognitive impairment',
    'Cognitive normal',
  ];
  public data1 = [[35, 45, 100]];
  public labels2: string[] = [
    'Costos en medicina',
    'Costos en transporte',
    'Costos en atención médica',
    'Costos en horas laborales',
  ];
  public data2 = [[85, 5, 10, 8]];
  public labels3: string[] = [
    'Right hippocampus',
    'Left hippocampus',
    'Right/left Putamen',
    'Amygdala',
    'Palladium',
  ];
  public data3 = [[55, 35, 4, 3, 3]];
  public labels4: string[] = [
    'Dinero ahorrado',
    'Reducción de tiempo invertido',
    'Mejora de condición con el tratamiento',
  ];
  public data4 = [[2, 3, 4]];
}
