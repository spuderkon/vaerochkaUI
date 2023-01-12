import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Observable } from 'rxjs';
import {FormControl, Validators} from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Airport } from 'src/models/airport/airport.model';
import * as moment from 'moment';
import { Routeinf } from 'src/models/routeinf/routeinf.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  title = "";
  routes : Routeinf[];
  airports: Airport[];
  departureDate: string;
  arrivalDate: string;
  departureCity: number;
  arrivalCity: number;
  minDate: Date;
  maxDate: Date;
  tableEnabled: boolean = false;
  depCityToChild : number;
  arrCityToChild : number;
  depDateToChild : string;
  arrDateToChild : string;
  depCity = new FormControl('',[Validators.required]);
  arrCity = new FormControl('',[Validators.required]);
  depTime = new FormControl('',[Validators.required]);
  arrTime = new FormControl();
  constructor(private service: SharedService) {
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth();
    this.minDate = new Date(currentYear - 0, currentMonth, currentDay);
    this.maxDate = new Date(currentYear, 3, 0);
   // this.departureDate = moment(this.departureDate).format('YYYY-MM-DD');
  }

  ngOnInit() {
    this.refreshAirports();
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
    if(this.arrivalDate == undefined ){
       this.departureDate = moment(this.departureDate).format('YYYY-MM-DD');
       this.depDateToChild = this.departureDate;
       this.depCityToChild = this.departureCity
       this.arrCityToChild = this.arrivalCity;
    }
    else{
      this.departureDate = moment(this.departureDate).format('YYYY-MM-DD');
      this.arrivalDate = moment(this.arrivalDate).format('YYYY-MM-DD');
    }
    
  }

}
