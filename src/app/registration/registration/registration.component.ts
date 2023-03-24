import { Component, OnInit, OnChanges, Input, ViewEncapsulation, Inject, SimpleChanges, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SharedService } from 'src/app/shared.service';
import { Routeinf } from 'src/models/routeinf/routeinf.model';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClentInfo } from 'src/models/clientInfo/clent-info.model';

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
  @Input() departureClientInfo: ClentInfo = new ClentInfo(); //УДАЛИТь
  @Input() arrivalClientInfo: ClentInfo = new ClentInfo(); //УДАЛИТь
  @Input() totalPrice: number | null;
  businessLetters = ['A', 'C', 'D', 'F'];
  economyLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

  businessRows: number[];
  economyRows: number[];
  departureBusinessSeats: string[];
  departureEconomySeats: string[] = [];
  arrivalBusinessSeats: string[] = [];
  arrivalEconomySeats: string[] = [];
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
  }

  ngOnInit(): void {
    //УДАЛИТЬ!!!
    this.refreshDepartureRouteById(4);
    this.refreshDepartureTariffById(2);
    this.refreshDepartureSeatsByRouteId(6);
    this.departureClientInfo.price = 13;
    this.refreshArrivalRouteById(6);
    this.refreshArrivalTariffById(4);
    this.refreshArrivalSeatsByRouteId(4);
    this.arrivalClientInfo.price = 12;
    this.generateDepartureSeats();

    if (this.departureClientInfo.route != null) {
      this.generateArrivalSeats();
    }
  }

  ngAfterViewInit(): void {

  }

  generateDepartureSeats(): void {
    if (this.departureClientInfo.route.aircraft_id == 1) {
      this.businessRows = Array(4).fill(1).map((x, i) => i + 1);
      this.economyRows = Array(20).fill(1).map((x, i) => i + 3);
      this.generateBusinessSeats(this.departureBusinessSeats);
    }
    else if (this.departureClientInfo.route.aircraft_id == 4) {
      this.businessRows = Array(2).fill(1).map((x, i) => i + 1);
      this.economyRows = Array(26).fill(1).map((x, i) => i + 3);
      this.generateEconomySeats(this.departureEconomySeats);
    }
  }

  generateArrivalSeats(): void {
    if (this.arrivalClientInfo.route.aircraft_id == 1) {
      this.businessRows = Array(3).fill(1).map((x, i) => i + 1);
      this.economyRows = Array(20).fill(1).map((x, i) => i + 3);
      this.generateBusinessSeats(this.arrivalBusinessSeats);
    }
    else if (this.arrivalClientInfo.route.aircraft_id == 4) {
      this.businessRows = Array(2).fill(1).map((x, i) => i + 1);
      this.economyRows = Array(26).fill(1).map((x, i) => i + 3);
      this.generateEconomySeats(this.arrivalEconomySeats);
    }
  }

  refreshDepartureRouteById(id: number): void {
    this.service.getRouteById(id).subscribe(data => {
      this.departureClientInfo.route = data[0];
    });
  }

  refreshDepartureTariffById(id: number): void {
    this.service.getTariffById(id).subscribe(data => {
      this.departureClientInfo.tariff = data[0];
    });
  }

  refreshDepartureSeatsByRouteId(id: number): void {
    this.service.getSeatsInfo(id).subscribe(data => {
      this.departureClientInfo.busySeats = data[0];
    })
  }

  refreshArrivalRouteById(id: number): void {
    this.service.getRouteById(id).subscribe(data => {
      this.arrivalClientInfo.route = data[0];
    });
  }

  refreshArrivalTariffById(id: number): void {
    this.service.getTariffById(id).subscribe(data => {
      this.arrivalClientInfo.tariff = data[0];
    });
  }

  refreshArrivalSeatsByRouteId(id: number): void {
    this.service.getSeatsInfo(id).subscribe(data => {
      this.arrivalClientInfo.busySeats = data[0];
    })
  }

  departureSeatIsBusy(seat: string): boolean {
    if (this.departureClientInfo.busySeats?.includes(seat)) return true;
    return false;
  }

  arrivalSeatIsBusy(seat: string): boolean {
    if (this.arrivalClientInfo.busySeats?.includes(seat)) return true;
    return false;
  }

  generateBusinessSeats(array: string[]) {
    for (let i = 0; i < this.businessRows.length; i++) {
      for (let j = 0; j < this.businessLetters.length; j++) {
        array.push(this.businessLetters[j] + this.businessRows[i]);
      }
    }
  }

  generateEconomySeats(array: string[]) {
    for (let i = 0; i < this.economyRows.length; i++) {
      for (let j = 0; j < this.economyLetters.length; j++) {
        array.push(this.economyLetters[j] + this.economyRows[i]);
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
      if (result != undefined) {
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
  cardCvv = new FormControl('', [Validators.required, Validators.pattern("[0-9]{3}")]);

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}