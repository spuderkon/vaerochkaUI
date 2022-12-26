import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs';
import {FormControl, Validators} from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Airport } from 'src/models/airport/airport.model';
import * as moment from 'moment';
import { Routeinf } from 'src/models/routeinf/routeinf.model';
import { Qwe } from 'src/models/qwe.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = "";
  qwer : Qwe;
  routes : Routeinf[];
  airports: Airport[];
  departureDate: string;
  arrivalDate: string;
  departureCity: number;
  arrivalCity: number;
  minDate: Date;
  maxDate: Date;
  tableDisabled: boolean = false;
  depCity = new FormControl('',[Validators.required]);
  arrCity = new FormControl('',[Validators.required]);
  depTime = new FormControl('',[Validators.required]);
  constructor(private service: SharedService) {
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear - 0, 11, currentDay);
    this.maxDate = new Date(currentYear + 1, 1, 0);
   // this.departureDate = moment(this.departureDate).format('YYYY-MM-DD');
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

  switchValues(departureCity: any, arrivalCity: any) {
    this.arrivalCity = departureCity;
    this.departureCity = arrivalCity;
  }

  showRoutes() {
    
    this.tableDisabled = true;
    if(this.arrivalDate == undefined ){
       this.departureDate = moment(this.departureDate).format('YYYY-MM-DD');
       console.log(this.departureCity,this.arrivalCity,this.departureDate)
      // this.service.getRoutesBy3Parameters(this.departureCity,this.arrivalCity,this.departureDate).subscribe(data => {
      //   this.routes = data;
      //   console.log(this.routes);
      //   
      // })
    }
    else{
      this.departureDate = moment(this.departureDate).format('YYYY-MM-DD');
      this.arrivalDate = moment(this.arrivalDate).format('YYYY-MM-DD');
      // this.service.getRoutesBy4Parameters(this.departureCity,this.arrivalCity,this.departureDate,this.arrivalDate).subscribe(data => {
      //   this.routes = data;
      //   console.log(this.routes);
      // });
    }
    
  }
} 
