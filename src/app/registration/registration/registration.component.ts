import { Component, OnInit, OnChanges, Input, ViewEncapsulation, Inject, SimpleChanges, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SharedService } from 'src/app/shared.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClentInfo } from 'src/models/clientInfo/clent-info.model';
import { Contact } from 'src/models/contact/contact.model';
import { Client } from 'src/models/client/client.model';
import { Passport } from 'src/models/passport/passport.model';
import { Registration } from 'src/models/registration/registration.model';

export interface PaymentDialogData {
  totalPrice: number;
  client: Client;
  passport: Passport;
  contact: Contact;
}

export interface AircraftInfoData {
  id: number;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegistrationComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() departureClientInfo: ClentInfo;
  @Input() arrivalClientInfo: ClentInfo;
  @Input() totalPrice: number | null;

  contact: Contact = new Contact();
  client: Client = new Client();
  passport: Passport = new Passport();
  registration: Registration = new Registration();

  businessLetters = ['A', 'C', 'D', 'F'];
  economyLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

  businessRows: number[];
  economyRows: number[];

  departureBusinessSeats: string[] = [];
  departureEconomySeats: string[] = [];
  arrivalBusinessSeats: string[] = [];
  arrivalEconomySeats: string[] = [];
  dataConfirmed: boolean = false;
  ticketEnabled: boolean = false;
  caughtError: boolean = false;

  departurePrice: number = 0;
  arrivalPrice: number = 0;

  arrivalRouteIsOn: boolean = false;

  clientSurname = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]);
  clientName = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]);
  clientLastName = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]);
  clientBirthday = new FormControl('', [Validators.required]);
  clientValidityPeriod = new FormControl('', [Validators.required]);
  clientPassportNumber = new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]);
  clientCountryOfIssue = new FormControl(1, [Validators.required]);
  clientCitizenship = new FormControl(1, [Validators.required]);
  clientEmail = new FormControl('', [Validators.required, Validators.email]);
  clientPhoneNumber = new FormControl('', [Validators.required, Validators.pattern("[0-9]{11}")]);
  clientDepartureSeat = new FormControl("", [Validators.required]);
  clientArrivalSeat = new FormControl("", [Validators.required]);

  minDateBirth: Date;
  maxDateBirth: Date;
  minDatePass: Date;
  maxDatePass: Date;
  minValidPeriod: Date;
  lastNameExist: boolean; //21.03.73
  lastNameStatus: string = 'Отчество (если есть)';
  booking_code: string;

  constructor(private service: SharedService, public dialog: MatDialog) {
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth();
    this.minDateBirth = new Date(currentYear - 99, currentMonth, currentDay);
    this.maxDateBirth = new Date(currentYear - 14, 0, 0);
    this.minDatePass = new Date(currentYear - 20, currentMonth, currentDay);
    this.maxDatePass = new Date(currentYear + 25, 0, 0);
    this.minValidPeriod = new Date(currentYear, currentMonth, currentDay)
    this.lastNameExist = true;
  }

  ngOnInit(): void {
    console.log(this.departureClientInfo.route.route_id);
    this.departurePrice = this.departureClientInfo.route.price * (this.departureClientInfo.tariff.markup / 100);
    this.generateDepartureSeats();
    if (this.arrivalClientInfo.route != null) {
      this.generateArrivalSeats();
      this.arrivalPrice = this.arrivalClientInfo.route.price * (this.arrivalClientInfo.tariff.markup / 100);
      this.arrivalRouteIsOn = true;
    }
    else {
      this.clientArrivalSeat.disable();
    }
  }

  ngOnChanges(): void {

  }

  confirm() {
    this.dataConfirmed = true;
    this.clientSurname.disable();
    this.clientName.disable();
    this.clientLastName.disable();
    this.clientBirthday.disable();
    this.clientValidityPeriod.disable();
    this.clientPassportNumber.disable();
    this.clientCountryOfIssue.disable();
    this.clientCitizenship.disable();
    this.clientEmail.disable();
    this.clientPhoneNumber.disable();
    this.clientDepartureSeat.disable();
    this.clientArrivalSeat.disable();
    this.findPassport(this.clientPassportNumber.value!);
    this.findContact(this.clientEmail.value!, this.clientPhoneNumber.value!);
    this.findClient(this.clientName.value!, this.clientSurname.value!, this.clientLastName.value!);
  }

  ngAfterViewInit(): void {

  }

  findContact(email: string, number: string): void {
    this.service.getContact(email, number).subscribe(data => {
      this.contact = data[0];
      console.log(this.contact);
    })
  }

  findClient(name: string, surname: string, lastname: string): void {
    this.service.getClient(name, surname, lastname).subscribe(data => {
      this.client = data[0];
      console.log(this.client);
    })
  }

  findPassport(number: string): void {
    this.service.getPassport(number).subscribe(data => {
      this.passport = data[0];
      console.log(this.passport);
    })
  }

  postContact(contact: Contact): void {
    this.service.postContact(contact).subscribe(data => {
      console.log(data);
    })
  }

  postClient(client: Client): void {
    this.service.postClient(client).subscribe(data => {
      console.log(data);
    })
  }

  postPassport(passport: Passport): void {
    this.service.postPassport(passport).subscribe(data => {
      console.log(data);
    })
  }

  postRegistration(registration: Registration): void {
    this.service.postRegistration(registration).subscribe(data => {
      console.log(data);
    })
  }

  generateDepartureSeats(): void {
    if (this.departureClientInfo.route.aircraft_id == 1) {
      this.businessRows = Array(4).fill(1).map((x, i) => i + 1);
      this.economyRows = Array(20).fill(1).map((x, i) => i + 3);
      for (let i = 0; i < this.businessRows.length; i++) {
        for (let j = 0; j < this.businessLetters.length; j++) {
          this.departureBusinessSeats.push(this.businessLetters[j] + this.businessRows[i]);
        }
      }
      for (let i = 0; i < this.economyRows.length; i++) {
        for (let j = 0; j < this.economyLetters.length; j++) {
          this.departureEconomySeats.push(this.economyLetters[j] + this.economyRows[i]);
        }
      }
    }
    else if (this.departureClientInfo.route.aircraft_id == 4) {
      this.businessRows = Array(2).fill(1).map((x, i) => i + 1);
      this.economyRows = Array(26).fill(1).map((x, i) => i + 3);
      for (let i = 0; i < this.businessRows.length; i++) {
        for (let j = 0; j < this.businessLetters.length; j++) {
          this.departureBusinessSeats.push(this.businessLetters[j] + this.businessRows[i]);
        }
      }
      for (let i = 0; i < this.economyRows.length; i++) {
        for (let j = 0; j < this.economyLetters.length; j++) {
          this.departureEconomySeats.push(this.economyLetters[j] + this.economyRows[i]);
        }
      }
    }
  }

  generateArrivalSeats(): void {
    if (this.arrivalClientInfo.route.aircraft_id == 1) {
      this.businessRows = Array(4).fill(1).map((x, i) => i + 1);
      this.economyRows = Array(18).fill(1).map((x, i) => i + 5);
      for (let i = 0; i < this.businessRows.length; i++) {
        for (let j = 0; j < this.businessLetters.length; j++) {
          this.arrivalBusinessSeats.push(this.businessLetters[j] + this.businessRows[i]);
        }
      }
      for (let i = 0; i < this.economyRows.length; i++) {
        for (let j = 0; j < this.economyLetters.length; j++) {
          this.arrivalEconomySeats.push(this.economyLetters[j] + this.economyRows[i]);
        }
      }
    }
    else if (this.arrivalClientInfo.route.aircraft_id == 4) {
      this.businessRows = Array(2).fill(1).map((x, i) => i + 1);
      this.economyRows = Array(26).fill(1).map((x, i) => i + 3);
      for (let i = 0; i < this.businessRows.length; i++) {
        for (let j = 0; j < this.businessLetters.length; j++) {
          this.arrivalBusinessSeats.push(this.businessLetters[j] + this.businessRows[i]);
        }
      }
      for (let i = 0; i < this.economyRows.length; i++) {
        for (let j = 0; j < this.economyLetters.length; j++) {
          this.arrivalEconomySeats.push(this.economyLetters[j] + this.economyRows[i]);
        }
      }
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
    if (this.departureClientInfo.busySeats!.includes(seat)) return true;
    return false;
  }

  arrivalSeatIsBusy(seat: string): boolean {
    if (this.arrivalClientInfo.busySeats!.includes(seat)) return true;
    return false;
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


  generateRegistrationCode(route_id: number, client_id: number): string {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let text = '';
    let rtFirstDigitStr = String(route_id)[0];
    let rtFirstDigitNum = Number(rtFirstDigitStr);
    let clFirstDigitStr = String(client_id)[0];
    let clFirstDigitNum = Number(clFirstDigitStr);
    for (let i = 0; i < 6; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text + rtFirstDigitNum + clFirstDigitNum;
  }

  openAircraftInfoDialog(id: number): void {
    const dialogRef = this.dialog.open(aircraftInfoDialog, { data: { id: id }, height: '800px', width: '600px', });
  }

  openPaymentDialog(totalPrice: number): void {
    if (this.passport == undefined!) {
      this.passport = new Passport();
      this.passport.birthdate = moment(this.clientBirthday.value).format('YYYY-MM-DD');
      console.log(moment(this.clientBirthday.value).format('YYYY-MM-DD'));
      this.passport.citizenship_id = this.clientCountryOfIssue.value;
      this.passport.country_of_issue_id = this.clientCountryOfIssue.value;
      this.passport.number = this.clientPassportNumber.value;
      this.passport.validity_period = moment(this.clientValidityPeriod.value).format('YYYY-MM-DD');
      this.postPassport(this.passport);
    }
    if (this.contact == undefined!) {
      this.contact = new Contact();
      this.contact.email = this.clientEmail.value;
      this.contact.number = this.clientPhoneNumber.value;
      this.postContact(this.contact);
    }
    if (this.client == undefined!) {
      this.client = new Client();
      this.client.name = this.clientName.value;
      this.client.surname = this.clientSurname.value;
      this.client.lastname = this.clientLastName.value;
    }

    const dialogRef = this.dialog.open(paymentDialog, { data: { totalPrice: totalPrice, client: this.client, passport: this.passport, contact: this.contact }, height: '450px', width: '500px', });

    dialogRef.beforeClosed().subscribe(data => {
      this.findClient(this.clientName.value!, this.clientSurname.value!, this.clientLastName.value!);
      this.findPassport(this.clientPassportNumber.value!);
      this.findContact(this.clientEmail.value!, this.clientPhoneNumber.value!);
    })

    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      if (data != undefined) {
        this.booking_code = this.generateRegistrationCode(this.departureClientInfo.route.route_id, this.client.id!);
        this.registration.route_id = this.departureClientInfo.route.route_id;
        this.registration.code = this.booking_code;
        this.registration.client_id = this.client.id;
        this.registration.contact_id = this.contact.id;
        this.registration.tariff_id = this.departureClientInfo.tariff.id;
        this.registration.seat = this.clientDepartureSeat.value![0];
        this.registration.price = this.departurePrice;
        this.registration.registered = false;
        console.log(this.registration)
        this.postRegistration(this.registration)
        if (this.arrivalClientInfo.route != null) {
          this.registration.route_id = this.arrivalClientInfo.route.route_id;
          this.registration.code = this.booking_code;
          this.registration.tariff_id = this.arrivalClientInfo.tariff.id;
          this.registration.seat = this.clientArrivalSeat.value![0];
          this.registration.price = this.arrivalPrice;
          this.registration.registered = false;
          this.postRegistration(this.registration)
        }
        this.ticketEnabled = true;
      }
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
    @Inject(MAT_DIALOG_DATA) public data: PaymentDialogData,) {
  }

  dataConfirmed: boolean = false;
  totalPrice: number = this.data.totalPrice;
  clientCopy: Client = new Client();
  cardNumber = new FormControl('', [Validators.required, Validators.pattern("[0-9]{16}")]);
  cardValidPer = new FormControl('', [Validators.required, Validators.pattern("[0-9]{2}")]);
  cardCvv = new FormControl('', [Validators.required, Validators.pattern("[0-9]{3}")]);

  ngOnInit(): void {
    this.clientCopy = this.data.client;
    this.findPassport(this.data.passport.number!);
    this.findClient(this.data.client.name!, this.data.client.surname!, this.data.client.lastname!)
  }

  confirm(): void {
    this.dataConfirmed = true;
    if (this.data.client == undefined!) {
      this.data.client = new Client();
      this.data.client.name = this.clientCopy.name;
      this.data.client.surname = this.clientCopy.surname;
      this.data.client.lastname = this.clientCopy.lastname;
      console.log(this.data.passport.id)
      this.data.client.passport_id = this.data.passport.id;
      this.postClient(this.data.client);
    }
  }

  onContinueClick(): void {
    this.dialogRef.close();
  }

  findClient(name: string, surname: string, lastname: string): void {
    this.service.getClient(name, surname, lastname).subscribe(data => {
      this.data.client = data[0];
      console.log(this.data.client);
    })
  }

  findPassport(number: string): void {
    this.service.getPassport(number).subscribe(data => {
      this.data.passport = data[0];
      console.log(this.data.passport);
    })
  }

  postClient(client: Client): void {
    this.service.postClient(client).subscribe(data => {
      console.log(data);
    })
  }
}

@Component({
  selector: 'aircraftInfoDialog',
  templateUrl: 'aircraftInfoDialog.html',
})
export class aircraftInfoDialog implements OnInit {

  model: string = '';
  image: string = '';

  constructor(private service: SharedService,
    public dialogRef: MatDialogRef<aircraftInfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AircraftInfoData) {
  }
  ngOnInit(): void {
    this.refreshAircraft();
  }

  refreshAircraft(): void {
    this.service.getAircraftById(this.data.id).subscribe(data => {
      this.model = data[0].model;
      this.image = data[0].image;
    })
  }
}
