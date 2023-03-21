import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Airport } from 'src/models/airport/airport.model';
import * as moment from 'moment';
import { Routeinf } from 'src/models/routeinf/routeinf.model';
import { Router } from '@angular/router';
import { RouteInformation } from 'src/models/routeInformation/route-information.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnChanges {
  title = "";
  routes: Routeinf[];
  airports: Airport[];
  departureDate: string = '2023-03-22';
  arrivalDate: string | null = null;
  departureCity: number = 36;
  arrivalCity: number = 1;
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

  routeDepartureInfo: any;
  tariffDepartureInfo: any;
  busySeatsDepartureInfo: string[];

  routeArrivalInfo: any;
  tariffArrivalInfo: any;
  busySeatsArrivalInfo: string[];

  departureRouteIsSelected: boolean = false;
  arrivalRouteIsSelected: boolean = false;

  constructor(private service: SharedService, private router: Router) {
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth();
    this.minDate = new Date(currentYear - 0, currentMonth, currentDay);
    this.maxDate = new Date(currentYear, 3, 0);
  }

  ngOnInit() {
    this.refreshAirports();
    this.showRoutes(); //удалить
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
    if (this.arrivalDate == null) {
      this.arrivalRouteIsSelected = true;
      this.depDateToChild = moment(this.departureDate).format('YYYY-MM-DD');
      this.depCityToChild = this.departureCity;
      this.arrCityToChild = this.arrivalCity;
    }
    else {
      this.arrivalRouteIsSelected = false;
      this.depDateToChild = moment(this.departureDate).format('YYYY-MM-DD');
      this.arrDateToChild = moment(this.arrivalDate).format('YYYY-MM-DD');
      this.depCityToChild = this.departureCity;
      this.arrCityToChild = this.arrivalCity;
    }

  }

  departureRouteSelectedChange(routeIsSelected: boolean): void {
    this.departureRouteIsSelected = routeIsSelected;
    console.log(routeIsSelected + '1');
  }

  arrivalRouteSelectedChange(routeIsSelected: boolean): void {
    this.arrivalRouteIsSelected = routeIsSelected;
    console.log(routeIsSelected + '2');
  }

  departureRouteInfoChange(regInfo: any) {

    if (regInfo.currentRoute != undefined) {
      if (this.departureRouteIsSelected == false) {

        this.registraionEnabled = false;//?????????
        this.routeDepartureInfo = undefined;
        this.tariffDepartureInfo = undefined;
        this.busySeatsDepartureInfo = new Array<string>;
      }
      this.registraionEnabled = false;
      this.routeDepartureInfo = regInfo.currentRoute[0];
      this.tariffDepartureInfo = regInfo.choosedTariff;
      this.busySeatsDepartureInfo = regInfo.busySeats;
    }

  }

  arrivalRouteInfoChange(regInfo: any) {

    if (regInfo.currentRoute != undefined) {
      this.registraionEnabled = false;
      this.routeArrivalInfo = regInfo.currentRoute[0];
      this.tariffArrivalInfo = regInfo.choosedTariff;
      this.busySeatsArrivalInfo = regInfo.busySeats;
    }

  }

  refreshPage() {
    window.location.reload();
  }

  test() {
    console.log(this.departureRouteIsSelected);
    console.log(this.routeDepartureInfo);
    console.log(this.routeArrivalInfo);
  }
} 
