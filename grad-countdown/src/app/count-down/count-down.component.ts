import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css']
})

export class CountDownComponent implements OnInit, OnDestroy {

  private subscription!: Subscription;

  dateNow = new Date();
  dDay = new Date('June 11 2023 12:00:00');

  milliSecondInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  secondsInAMinute = 60;

  timeDifference!: number;
  
  daysToDay!: number;
  hoursToDay!: number
  minutesToDay!: number
  secondsToDay!: number

  constructor() { }

  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference: number) {
    this.daysToDay = Math.floor((timeDifference) / ( this.milliSecondInASecond *
      this.minutesInAnHour * this.secondsInAMinute * this.hoursInADay ));
    
    this.hoursToDay = Math.floor((timeDifference) / ( this.milliSecondInASecond *
      this.minutesInAnHour * this.secondsInAMinute ) % this.hoursInADay );
    
    this.minutesToDay = Math.floor((timeDifference) / ( this.milliSecondInASecond *
      this.minutesInAnHour ) % this.secondsInAMinute );
    
    this.secondsToDay = Math.floor((timeDifference) / ( this.milliSecondInASecond ) % 
      this.secondsInAMinute );
  }

  ngOnInit(): void {
    this.subscription = interval(1000)
    .subscribe(x => { this.getTimeDifference(); });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
