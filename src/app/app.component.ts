import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Airport } from 'src/models/airport.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  departure = "";
  arrival = "";
  airports: Airport[];

  constructor(private service: SharedService) {
    
  }

  ngOnInit() {
    this.refreshAirports();
  }

  refreshAirports() {
    this.service.getAirports().subscribe(data => {
       this.airports = data;
       console.log(this.airports);
    })
  }

  switchValues(departure: any, arrival: any) {
    this.arrival = departure;
    this.departure = arrival;
  }

  displayFn(airport: Airport): string {
    return airport && airport.city_name ? airport.city_name : '';
  }
}
