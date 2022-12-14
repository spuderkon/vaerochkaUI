import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  departure="";
  arrival="";

  switchValues(departure : any, arrival : any)
  {
    this.arrival = departure;
    this.departure = arrival;
  }
}
