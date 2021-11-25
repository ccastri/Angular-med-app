import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public title!: string;
  public titleSubs$!: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) { 
// console.log(route.snapshot.children[0].data)
this.titleSubs$ = this.getRoutesArgs()
                      .subscribe(( {title}) => {
                        this.title = title;
                        document.title = `Joker - ${ title }`;
                      });
}
  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }
  getRoutesArgs(){

    return this.router.events.pipe(
      filter<any>(event => event instanceof ActivationEnd),
      filter((event) => event.snapshot.firstChild === null ),
      map((event) => event.snapshot.data)
      
      )

      // Otra forma...
      // .subscribe((data) => {
        //    this.title = data.title;
        // });
      }
    }
    
