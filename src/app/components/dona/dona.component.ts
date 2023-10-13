import { Component, Input } from '@angular/core';
//Third-party

// import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [],
})
export class DonaComponent {
  @Input() title: string = 'Sin titulo';

  // Doughnut
  public doughnutChartLabels: string[] = ['Red', 'Blue', 'Yellow'];
  public doughnutChartData: number[] = [300, 50, 100];
  public doughnutChartType: string = 'doughnut';
  public doughnutChartColors: any[] = [
    {
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
      ],
    },
  ];
}
