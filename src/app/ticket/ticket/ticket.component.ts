import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Registration } from 'src/models/registration/registration.model';
import { Ticket } from 'src/models/ticket/ticket.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit, OnChanges {
  @Input() registrationCode: string;
  departureTicket: Ticket = new Ticket();
  arrivalTicket: Ticket = new Ticket();
  registration: Registration = new Registration();
  ticketNotFound: boolean = false;

  constructor(private service: SharedService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.refreshRegistrationInfo();
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
