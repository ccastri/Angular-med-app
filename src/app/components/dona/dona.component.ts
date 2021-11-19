import { Component, Input } from '@angular/core';
//Third-party 

import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {
  @Input() title: string = 'Sin titulo' ; 
   
   
  // Doughnut
  @Input('labels') doughnutChartLabels: Label[] = ["label1", 'label2', 'label3']; // @input('labels') para cambiar nombre de doughnutChartLabels
  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    // [50, 150, 120],
    // [250, 130, 70],
  ];
  // public doughnutChartType: ChartType = 'doughnut'; //propiedad string enviada al html

  public colors: Color[] = [
    {backgroundColor: ['#6857E6', '#009FEE', '#F02059', '#C355E6'] }
  ];
}
