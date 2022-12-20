import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Airport } from 'src/models/airport.model';
import * as moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  departure = "";
  arrival = "";
  airports: Airport[];
  departureDate: string;
  arrivalDate: string;
  departureCity: string;
  arrivalCity: string;
  minDate: Date;
  maxDate: Date;
  constructor(private service: SharedService) {
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear - 0, 11, currentDay);
    this.maxDate = new Date(currentYear + 1, 1, 0);
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

  showRoutes() {
    this.departureDate = moment(this.departureDate).format('YYYY-MM-DD');
    this.arrivalDate = moment(this.arrivalDate).format('YYYY-MM-DD');
    console.log(this.departureCity,this.arrivalCity,this.departureDate,this.arrivalDate);
  }
}
