import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Airport } from 'src/models/airport/airport.model';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  // departure = "";
  // arrival = "";
  // airports: Airport[];
  // departureDate: string;
  // arrivalDate: string;
  // departureCity: string;
  // arrivalCity: string;
  // minDate: Date;
  // maxDate: Date;
  // constructor(private service: SharedService) {
  //   const currentYear = new Date().getFullYear();
  //   const currentDay = new Date().getDate();
  //   this.minDate = new Date(currentYear - 0, 11, currentDay);
  //   this.maxDate = new Date(currentYear + 1, 1, 0);
  // }

  ngOnInit() {
    // this.refreshAirports();
  }

  // refreshAirports() {
  //   this.service.getAirports().subscribe(data => {
  //     this.airports = data;
  //     console.log(this.airports);
  //   })
  // }

  // switchValues(departureCity: any, arrivalCity: any) {
  //   this.arrivalCity = departureCity;
  //   this.departureCity = arrivalCity;
  // }

  // showRoutes() {
  //   this.departureDate = moment(this.departureDate).format('YYYY-MM-DD');
  //   this.arrivalDate = moment(this.arrivalDate).format('YYYY-MM-DD');
  //   console.log(this.departureCity,this.arrivalCity,this.departureDate,this.arrivalDate);
  // }

}
