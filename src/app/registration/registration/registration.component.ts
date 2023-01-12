import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  clientSurname = new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]);
  clientName = new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]);
  clientLastName = new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]);
  clientBirthday = new FormControl(moment());
  clientPassportNumber = new FormControl('',[Validators.required, Validators.pattern("[0-9 ]{10}")]);
  clientCountryOfIssue = new FormControl('',[Validators.required]);
  clientCitizenship = new FormControl('',[Validators.required]);
  clientEmail = new FormControl('',[Validators.required, Validators.email]);
  clientPhoneNumber = new FormControl('',[Validators.required, Validators.pattern("[0-9 ]{11}")]);


  minDateBirth: Date;
  maxDateBirth: Date;
  minDatePass: Date;
  maxDatePass: Date;

  constructor(private service: SharedService) { 
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth();
    this.minDateBirth = new Date(currentYear - 99, currentMonth, currentDay);
    this.maxDateBirth = new Date(currentYear - 12, 0, 0);
    this.minDatePass = new Date(currentYear - 20, currentMonth, currentDay);
    this.maxDatePass = new Date(currentYear + 25, 0, 0);
  }

  ngOnInit(): void {
    
  }
}
