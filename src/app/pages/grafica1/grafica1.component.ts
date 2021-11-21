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
  public data1 = [[35, 45, 100]
  ];
  public labels2: string[] = [
    "True positives",
    'True Negatives',
    "False positives",
    'False Negatives',
    
  ];
  public data2 = [[85, 5, 10, 8]
  ];
  public labels3: string[] = [
    "Right hippocampus",
    "Left hippocampus",
    'Right/left Putamen',
    "Amygdala",
    'Palladium',
    
  ];
  public data3 = [[55, 35, 4, 3, 3]
  ];
  public labels4: string[] = [
    "Aumento en biceps (cm)",
    "Aumento en triceps (cm)",
    'Disminucion de porcentaje de grasa (%)',
        
  ];
  public data4 = [[2, 3, 4  ]
  ];
}
