import { Component, OnInit, OnChanges, Input, ViewEncapsulation, Inject, SimpleChanges, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SharedService } from 'src/app/shared.service';
import { Routeinf } from 'src/models/routeinf/routeinf.model';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  price: number;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegistrationComponent implements OnInit, AfterViewInit {
  @Input() currentRoute: any;
  @Input() currentTariff: any;
  @Input() busySeats: string[];
  businessLetters = ['A', 'C', 'D', 'F'];
  economyLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
  businessRows: number[];
  economyRows: number[];
  businessSeats: string[] = [] ;
  economySeats: string[] = [];
  selectedSeat: string;

  clientSurname = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]);
  clientName = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]);
  clientLastName = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]);
  clientBirthday = new FormControl(moment());
  clientPassportNumber = new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]);
  clientCountryOfIssue = new FormControl('', [Validators.required]);
  clientCitizenship = new FormControl('', [Validators.required]);
  clientEmail = new FormControl('', [Validators.required, Validators.email]);
  clientPhoneNumber = new FormControl('', [Validators.required, Validators.pattern("[0-9]{11}")]);
  clientSeat = new FormControl("", [Validators.required]);



  minDateBirth: Date;
  maxDateBirth: Date;
  minDatePass: Date;
  maxDatePass: Date;
  lastNameExist: boolean;
  lastNameStatus: string = 'Отчество (если есть)';

  constructor(private service: SharedService, public dialog: MatDialog) {
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth();
    this.minDateBirth = new Date(currentYear - 99, currentMonth, currentDay);
    this.maxDateBirth = new Date(currentYear - 12, 0, 0);
    this.minDatePass = new Date(currentYear - 20, currentMonth, currentDay);
    this.maxDatePass = new Date(currentYear + 25, 0, 0);
    this.lastNameExist = true;
    this.businessRows = Array(2).fill(1).map((x, i) => i + 1);
    this.economyRows = Array(26).fill(1).map((x, i) => i + 3);
    this.generateBusinessSeats();
    this.generateEconomySeats();
  }

  ngOnInit(): void {
    this.service.getTariffById(this.currentTariff.id).subscribe(data => {
      this.currentTariff = data[0];
    });
    this.service.getRouteById(this.currentRoute.route_id).subscribe(data => {
      this.currentRoute = data[0];
    });
  }

  ngAfterViewInit(): void {
  }
  
  generateBusinessSeats() {
    for (let i = 0; i < this.businessRows.length; i++) {
      for (let j = 0; j < this.businessLetters.length; j++) {
        this.businessSeats.push(this.businessLetters[j] + this.businessRows[i]);
      }
    }
  }
  
  busy(seat: string) : boolean {
    if(this.busySeats.includes(seat)) return true;
    return false;
  }

  generateEconomySeats() {
    for (let i = 0; i < this.economyRows.length; i++) {
      for (let j = 0; j < this.economyLetters.length; j++) {
        this.economySeats.push(this.economyLetters[j] + this.economyRows[i]);
      }
    }
  }

  lastNameReverse() {
    this.lastNameExist = !this.lastNameExist;
    if (this.lastNameExist) {
      this.clientLastName.enable();
      this.lastNameStatus = 'Отчество (если есть)';
    }
    else {
      this.clientLastName.disable();
      this.clientLastName.setValue('');
      this.lastNameStatus = 'Отсутствует';
    }
  }

  openAircraftInfoDialog(): void {
    const dialogRef = this.dialog.open(aircraftInfoDialog, { height: '800px', width: '600px', });
  }

  openPaymentDialog(price: number): void {
    const dialogRef = this.dialog.open(paymentDialog, { data: { price: price }, height: '450px', width: '500px', });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined){
        //case для отправления данных
      }
    })
  }
}

@Component({
  selector: 'aircraftInfoDialog',
  templateUrl: 'aircraftInfoDialog.html',
})
export class aircraftInfoDialog implements OnInit {

  aircraft: any;

  constructor(private service: SharedService, public dialogRef: MatDialogRef<aircraftInfoDialog>) {

  }
  ngOnInit(): void {
    this.service.getAircraftById(4).subscribe(data => {
      this.aircraft = data[0];
    })
  }


}

@Component({
  selector: 'paymentDialog',
  templateUrl: 'paymentDialog.html',
})
export class paymentDialog implements OnInit {

  constructor(private service: SharedService,
    public dialogRef: MatDialogRef<aircraftInfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
  }

  price: number = this.data.price;
  cardNumber = new FormControl('', [Validators.required, Validators.pattern("[0-9]{16}")]);
  cardValidPer = new FormControl('', [Validators.required, Validators.pattern("[0-9]{2}")]);
  cardCvv= new FormControl('', [Validators.required, Validators.pattern("[0-9]{3}")]);

  ngOnInit(): void {
   
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}