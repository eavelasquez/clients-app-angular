import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() title: string;
  public subscription: Subscription;
  public latestSecond: number;
  public secondsCounter: Observable<number>;
  public observableNumber: Observable<number>;

  constructor() { }

  ngOnInit(): void {
    this.secondsCounter = interval(1000);
    /** Create an Observable */
    this.observableNumber = new Observable((observer) => {
      /** Initialize value of temp variable 'val' with 0 */
      let value = 0;
      const time = setInterval(() => {
        observer.next(value);
        /** Increment value of 'value' after every one second */
        value += 2;
      }, 1000);
      return () => clearInterval(time);
    });

    /** Call subscribe() to start listening for updates */
    this.subscription = this.observableNumber.subscribe((second) => this.latestSecond = second);
  }

  /** unsubscribe when the component is destroyed */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
