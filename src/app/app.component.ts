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
import { ClentInfo } from 'src/models/clientInfo/clent-info.model';

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
  arrivalDate: string | null = null;
  departureCity: number = 36;
  arrivalCity: number = 1;
  minDate: Date;
  maxDate: Date;
  registraionEnabled: boolean = true;

  totalPrice: number | null = 0;
  departurePrice: number = 0;
  arrivalPrice: number = 0;

  depCityToChild: number;
  arrCityToChild: number;
  depDateToChild: string | null;
  arrDateToChild: string | null;
  depCityAsString: string;
  arrCityAsString: string;
  departureClientInfo: ClentInfo = new ClentInfo();
  arrivalClientInfo: ClentInfo = new ClentInfo();

  depCity = new FormControl('', [Validators.required]);
  arrCity = new FormControl('', [Validators.required]);
  depDate = new FormControl('', [Validators.required]);
  arrDate = new FormControl('', []);

  routeDepartureInfo: any = null;
  tariffDepartureInfo: any = null;
  busySeatsDepartureInfo: string[] | null = null;

  routeArrivalInfo: any = null;
  tariffArrivalInfo: any = null;
  busySeatsArrivalInfo: string[] | null = null;

  arrivalRouteIsOff: boolean = true;
  departureRouteIsSelected: boolean = false;
  arrivalRouteIsSelected: boolean = false;
  departureRoutesListIsFull: boolean = false;
  arrivalRoutesListIsFull: boolean = false;

  constructor(private service: SharedService, private router: Router) {
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth();
    this.minDate = new Date(currentYear - 0, currentMonth, currentDay);
    this.maxDate = new Date(currentYear, 3, 0);
  }

  ngOnInit() {
    this.refreshAirports();

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
    if (this.arrivalDate == null) {
      this.depDateToChild = moment(this.departureDate).format('YYYY-MM-DD');
      this.arrDateToChild = null;
      this.depCityToChild = this.departureCity;
      this.arrCityToChild = this.arrivalCity;
      this.arrivalRouteIsOff = true;
    }
    else {
      this.depDateToChild = moment(this.departureDate).format('YYYY-MM-DD');
      this.arrDateToChild = moment(this.arrivalDate).format('YYYY-MM-DD');
      this.depCityToChild = this.departureCity;
      this.arrCityToChild = this.arrivalCity;
      this.arrivalRouteIsOff = false;
    }
    // console.log('arrivalRouteIsOff = ' + this.arrivalRouteIsOff);
    // console.log('depDate = ' + this.depDateToChild)
    // console.log('arrDate = ' + this.arrDateToChild)
    // console.log('depRouteIsSelected = ' + this.departureRouteIsSelected);
    // console.log('arrRouteIsSelected = ' + this.arrivalRouteIsSelected);
  }

  departureRouteSelectedChange(routeIsSelected: boolean): void {
    this.departureRouteIsSelected = routeIsSelected;
    console.log('depRouteIsSelected = ' + this.departureRouteIsSelected);
  }

  arrivalRouteSelectedChange(routeIsSelected: boolean): void {
    this.arrivalRouteIsSelected = routeIsSelected;
    console.log('arrRouteIsSelected = ' + this.arrivalRouteIsSelected);
  }

  departureRoutesListIsFullChange(listIsFull: boolean): void {
    this.departureRoutesListIsFull = listIsFull;
    console.log('depRoutesListIsFull = ' + this.departureRoutesListIsFull);
  }

  arrivalRoutesListIsFullChange(listIsFull: boolean): void {
    this.arrivalRoutesListIsFull = listIsFull;
    console.log('arrRoutesListIsFull = ' + this.arrivalRoutesListIsFull);
  }

  departureRouteInfoChange(regInfo: any) {
    this.departureClientInfo.route = regInfo.currentRoute;
    this.departureClientInfo.tariff = regInfo.choosedTariff;
    this.departureClientInfo.busySeats = regInfo.busySeats;
    this.departureClientInfo.price = regInfo.totalPrice;
    this.departurePrice = regInfo.totalPrice;
  }

  arrivalRouteInfoChange(regInfo: any) {
    this.arrivalClientInfo.route = regInfo.currentRoute;
    this.arrivalClientInfo.tariff = regInfo.choosedTariff;
    this.arrivalClientInfo.busySeats = regInfo.busySeats;
    this.arrivalClientInfo.price = regInfo.totalPrice;
    this.arrivalPrice = regInfo.totalPrice;
  }

  refreshPage() {
    window.location.reload();
  }

  goToRegistration(): void {
    this.totalPrice = this.departureClientInfo.price! + this.arrivalClientInfo.price!;

  }

  test() {
    console.log('routeDepartureInfo = ');
    console.log(this.departureClientInfo.route)
    console.log('tariffDepartureInfo = ');
    console.log(this.departureClientInfo.tariff)
    console.log('busySeatsDepartureInfo = ');
    console.log(this.departureClientInfo.busySeats)
    console.log('routeArrivalInfo = ');
    console.log(this.arrivalClientInfo.route)
    console.log('tariffArrivalInfo = ');
    console.log(this.arrivalClientInfo.tariff)
    console.log('busySeatsArrivalInfo = ');
    console.log(this.arrivalClientInfo.busySeats)
    console.log();
    console.log('depRouteIsSelected = ' + this.departureRouteIsSelected);
    console.log('arrRouteIsSelected = ' + this.arrivalRouteIsSelected);
    console.log('depRoutesListIsFull = ' + this.departureRoutesListIsFull);
    console.log('arrRoutesListIsFull = ' + this.arrivalRoutesListIsFull);
  }
} 