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
  @Input() clientSurname: string;
  departureTicket: Ticket = new Ticket();
  arrivalTicket: Ticket = new Ticket();
  registration: Registration = new Registration();
  dataIsFull: boolean = false;
  ticketNotFound: boolean = false;

  constructor(private service: SharedService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.refreshRegistrationInfo();
  }

  refreshRegistrationInfo(): void {
    this.service.getRegistrationFullInfoByCodeAndSurname(this.registrationCode, this.clientSurname).subscribe(data => {
      console.log(this.registrationCode)
      if (data.length == 1) {
        this.dataIsFull = true;
        this.departureTicket = data[0];
        this.arrivalTicket = new Ticket();
        this.ticketNotFound = false;
      }
      else if (data.length == 2) {
        this.dataIsFull = true;
        this.departureTicket = data[0];
        this.arrivalTicket = data[1];
        this.ticketNotFound = false;
      }
      else {
        this.dataIsFull = false;
        this.ticketNotFound = true;
      }
    })
  }
}
