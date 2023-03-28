import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  registration: Registration = new Registration();
  departureTicket: Ticket = new Ticket();
  arrivalTicket: Ticket = new Ticket();
  ticketNotFound: boolean = false;
  today: Date;

  constructor(private service: SharedService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.refreshRegistrationInfo();
  }

  registrate(): void {
    this.today = moment().toDate();
    console.log(this.today);
    //let diff = this.departureTicket.startTime - this.today;
    //console.log(diff);
  }

  refreshRegistrationInfo(): void {
    this.service.getRegistrationInfoBycode(this.registrationCode).subscribe(data => {
      console.log(this.registrationCode)
      if (data.length == 1) {
        this.departureTicket = data[0];
        this.arrivalTicket = new Ticket();
        this.ticketNotFound = false;
      }
      else if (data.length == 2) {
        this.departureTicket = data[0];
        this.arrivalTicket = data[1];
        this.ticketNotFound = false;
      }
      else {
        this.ticketNotFound = true;
      }
    })
  }
}
