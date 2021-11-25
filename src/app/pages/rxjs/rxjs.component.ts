import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {
  public intervalSubs: Subscription;
  constructor() {
    // this.retornaObservable().pipe(retry(1)).subscribe({

    //   next: (value) => console.log('subs:', value),
    //   error: (e) => console.warn('Error', e),
    //   complete: () => console.info('complete')
    // });
    this.intervalSubs = this.returnInterval().subscribe(console.log);
    this.returnInterval().subscribe();
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  returnInterval(): Observable<number> {
    return interval(500).pipe(
      map((value) => value + 1),
      filter((value) => (value % 2 == 0 ? true : false)),
      take(10)
    );
  }
  retornaObservable(): Observable<number> {
    let i = -1;

    const obs$ = new Observable<number>((observer) => {
      const sub = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 5) {
          clearInterval(sub);
          observer.complete();
        }
        if (i === 2) {
          observer.error('i llegó a 2');
        }
      }, 1000);
    });
    return obs$;
  }
}
