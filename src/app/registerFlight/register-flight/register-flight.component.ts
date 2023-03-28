import { Component, Input, OnChanges, OnInit, SimpleChanges, AfterViewInit } from '@angular/core';
import * as moment from 'moment';
import { SharedService } from 'src/app/shared.service';
import { Registration } from 'src/models/registration/registration.model';
import { Ticket } from 'src/models/ticket/ticket.model';

@Component({
  selector: 'app-register-flight',
  templateUrl: './register-flight.component.html',
  styleUrls: ['./register-flight.component.css']
})
export class RegisterFlightComponent implements OnInit, OnChanges {
  @Input() registrationCode: string;
  @Input() clientSurname: string;
  departureRegistration: Registration = new Registration();
  arrivalRegistration: Registration = new Registration();
  departureTicket: Ticket = new Ticket();
  arrivalTicket: Ticket = new Ticket();
  ticketNotFound: boolean = false;
  dataIsFull: boolean = false;
  departureTimeDifference: number | null;
  arrivalTimeDifference: number | null;

  departureRegistrationIsOpend: boolean = false;
  arrivalRegistrationIsOpend: boolean = false;
  departureRegistrationIsOver: boolean = false;
  arrivalRegistrationIsOver: boolean = false;
  departureRegistrationIsNotStarted: boolean = false;
  arrivalRegistrationIsNotStarted: boolean = false;

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.getRegistrationFullInfoByCodeAndSurname();
    this.getRegistration();
  }

  ngOnChanges(): void {
    this.getRegistrationFullInfoByCodeAndSurname();
    this.getRegistration();
  }

  calculateDiff(sentOn: Date) {
    let todayDate = new Date();
    let sentOnDate = new Date(sentOn);
    sentOnDate.setDate(sentOnDate.getDate());
    let differenceInTime = todayDate.getTime() - sentOnDate.getTime();
    let differenceInHours = Math.floor(differenceInTime / (1000 * 3600));
    return differenceInHours;
  }

  getRegistration(): void {
    this.service.getRegistrationByCode(this.registrationCode).subscribe(data => {
      if (data.length == 1) {
        this.departureRegistration = data[0];
      }
      if (data.length == 2) {
        this.departureRegistration = data[0];
        this.arrivalRegistration = data[1];
      }
      else {  
        this.departureRegistration = new Registration();
        this.arrivalRegistration = new Registration();
      }
    })
  }

  updateRegistration(registration: Registration) {
    registration.registered = true;
    console.log(registration);
    this.service.updateRegistration(registration).subscribe(data => {
      console.log(data);
      this.getRegistrationFullInfoByCodeAndSurname();
      this.getRegistration();
    });
  }

  getRegistrationFullInfoByCodeAndSurname(): void {
    this.service.getRegistrationFullInfoByCodeAndSurname(this.registrationCode, this.clientSurname).subscribe(data => {
      if (data.length == 1) {
        this.dataIsFull = true;
        this.departureTicket = data[0];
        this.arrivalTicket = new Ticket();
        this.departureTimeDifference = this.calculateDiff(this.departureTicket.startTime!);
        this.arrivalTimeDifference = null;
        if (this.departureTicket.registered) {
          this.departureRegistrationIsOpend = false;
          this.departureRegistrationIsNotStarted = false;
          this.departureRegistrationIsOver = false;
        }
        else {
          if (this.departureTimeDifference >= -24 && this.departureTimeDifference < 0) {
            this.departureRegistrationIsOpend = true;
            this.departureRegistrationIsNotStarted = false;
            this.departureRegistrationIsOver = false;
          }
          if (this.departureTimeDifference >= 0) {
            this.departureRegistrationIsOver = true;
            this.departureRegistrationIsOpend = false;
            this.departureRegistrationIsNotStarted = false;
          }
          if (this.departureTimeDifference < -24) {
            this.departureRegistrationIsOver = false;
            this.departureRegistrationIsOpend = false;
            this.departureRegistrationIsNotStarted = true;
          }
        }
        this.ticketNotFound = false;
      }
      else if (data.length == 2) {
        this.dataIsFull = true;
        this.departureTicket = data[0];
        this.arrivalTicket = data[1];
        this.departureTimeDifference = this.calculateDiff(this.departureTicket.startTime!);
        this.arrivalTimeDifference = this.calculateDiff(this.arrivalTicket.startTime!);
        if (this.departureTicket.registered) {
          this.departureRegistrationIsOpend = false;
          this.departureRegistrationIsNotStarted = false;
          this.departureRegistrationIsOver = false;
        }
        else {
          if (this.departureTimeDifference >= -24 && this.departureTimeDifference < 0) {
            this.departureRegistrationIsOpend = true;
            this.departureRegistrationIsNotStarted = false;
            this.departureRegistrationIsOver = false;
          }
          if (this.departureTimeDifference >= 0) {
            this.departureRegistrationIsOver = true;
            this.departureRegistrationIsOpend = false;
            this.departureRegistrationIsNotStarted = false;
          }
          if (this.departureTimeDifference < -24) {
            this.departureRegistrationIsOver = false;
            this.departureRegistrationIsOpend = false;
            this.departureRegistrationIsNotStarted = true;
          }
        }
        if (this.arrivalTicket.registered) {
          this.arrivalRegistrationIsOpend = false;
          this.arrivalRegistrationIsNotStarted = false;
          this.arrivalRegistrationIsOver = false;
        }
        else {
          if (this.arrivalTimeDifference >= -24 && this.departureTimeDifference < 0) {
            this.arrivalRegistrationIsOpend = true;
            this.arrivalRegistrationIsNotStarted = false;
            this.arrivalRegistrationIsOver = false;
          }
          if (this.arrivalTimeDifference >= 0) {
            this.arrivalRegistrationIsOver = true;
            this.arrivalRegistrationIsOpend = false;
            this.arrivalRegistrationIsNotStarted = false;
          }
          if (this.arrivalTimeDifference < -24) {
            this.arrivalRegistrationIsOver = false;
            this.arrivalRegistrationIsOpend = false;
            this.arrivalRegistrationIsNotStarted = true;
          }
        }
        this.ticketNotFound = false;
      }
      else {
        this.departureTimeDifference = null;
        this.arrivalTimeDifference = null;
        this.departureTicket = new Ticket();
        this.arrivalTicket = new Ticket();
        this.ticketNotFound = true;
        this.dataIsFull = false;
      }
    })
  }
}
