import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Airport } from 'src/models/airport/airport.model';
import * as moment from 'moment';
import { Routeinf } from 'src/models/routeinf/routeinf.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnChanges {
  title = "";
  routes: Routeinf[];
  airports: Airport[];
  departureDate: string;
  arrivalDate: string;
  departureCity: number;
  arrivalCity: number;
  minDate: Date;
  maxDate: Date;
  tableEnabled: boolean = false;
  registraionEnabled: boolean = false;
  depCityToChild: number;
  arrCityToChild: number;
  depDateToChild: string;
  arrDateToChild: string;
  depCityAsString: string;
  arrCityAsString: string;
  depCity = new FormControl('', [Validators.required]);
  arrCity = new FormControl('', [Validators.required]);
  depTime = new FormControl('', [Validators.required]);
  arrTime = new FormControl();
  regCurrentRoute : any;
  regCurrentTariff : any;

  constructor(private service: SharedService, private router: Router) {
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth();
    this.minDate = new Date(currentYear - 0, currentMonth, currentDay);
    this.maxDate = new Date(currentYear, 3, 0);
  }

  ngOnInit() {
    this.refreshAirports();
    console.log(this.router.url);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  refreshAirports() {
    this.service.getAirports().subscribe(data => {
      this.airports = data;
    })
  }

  switchValues(departureCity: any, arrivalCity: any) {
    this.arrivalCity = departureCity;
    this.departureCity = arrivalCity;
  }

  showRoutes() {
    this.tableEnabled = true;
    if (this.arrivalDate == undefined) {
      this.departureDate = moment(this.departureDate).format('YYYY-MM-DD');
      this.depDateToChild = this.departureDate;
      this.depCityToChild = this.departureCity
      this.arrCityToChild = this.arrivalCity;
    }
    else {
      this.departureDate = moment(this.departureDate).format('YYYY-MM-DD');
      this.arrivalDate = moment(this.arrivalDate).format('YYYY-MM-DD');
    }

  }

  regInfoReady(regInfo: any) {
    if (regInfo.currentRoute != undefined) {
      this.registraionEnabled = true;
      console.log(regInfo);
      this.regCurrentRoute = regInfo.currentRoute;
      this.regCurrentTariff = regInfo.choosedTariff;
    }
  }
  
  refreshPage(){
    window.location.reload();
  }
} 
