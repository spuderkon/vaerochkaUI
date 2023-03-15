import { AfterViewInit, Component, Input, OnInit, ViewChild, Inject, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Routeinf } from 'src/models/routeinf/routeinf.model';
import { SharedService } from '../shared.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tariff } from 'src/models/tariff/tariff.model';
import { Route } from '@angular/router';


export interface DialogData {
  airline_id: number;
  price: number;
  route_id: number;
}

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})


export class RouteComponent implements OnInit, AfterViewInit, OnChanges {
  @Output('regInfo') regInfo = new EventEmitter<{ currentRoute: any, choosedTariff: any, busySeats: string[]}>();
  @Input('depCityToChild') depCity: number;
  @Input('arrCityToChild') arrCity: number;
  @Input('depDateToChild') depDate: string;
  @Input('arrDateToChild') arrDate: string;

  displayedColumns: string[] = ['Departure', 'Arrive', 'Airline', 'Route', 'InJourney', 'Price', 'Seats','Button'];
  dataSource: MatTableDataSource<Routeinf>;
  PhotoUrl: string;
  routes: Routeinf[];
  listIsFull: boolean = false;
  listIsEmpty: boolean = false;
  depCityAsString: string;
  arrCityAsString: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: SharedService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.routes);

  }

  ngOnInit(): void {
    this.refreshData();
    this.refreshCitys();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refreshData();
  }

  refreshData() {
    this.service.getRoutesBy3Parameters(this.depCity, this.arrCity, this.depDate).subscribe(data => {
      if (data.length == 0) {
        this.listIsFull = false;
        this.listIsEmpty = true;
        this.routes = new Array<Routeinf>;
        this.dataSource = new MatTableDataSource();
      }
      else {
        this.routes = data;
        this.listIsEmpty = false;
        this.dataSource = new MatTableDataSource(this.routes);
        this.listIsFull = true;
      }
    });
  }

  refreshCitys(){
    this.service.getCitysById(this.depCity, this.arrCity).subscribe(data => {
      this.depCityAsString = data.map((m: any) => m.departure);
      this.arrCityAsString = data.map((m: any) => m.arrival);
    });
  }
  openDialog(airline_id: number, price: number, route_id: number): void {
    const dialogRef = this.dialog.open(routeDialog, { data: { airline_id: airline_id, price: price, route_id: route_id }, height: '500px', width: '900px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.regInfo.emit({currentRoute: result[0], choosedTariff: result[1], busySeats: result[2]});
      }
    });
  }
}

@Component({
  selector: 'routeDialog',
  templateUrl: 'routeDialog.html',
})
export class routeDialog implements OnInit {

  constructor(private service: SharedService,
    public dialogRef: MatDialogRef<routeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {

  }
  tariffs: Tariff[];
  route: Routeinf[];
  price: number = this.data.price;
  dis: boolean = true;
  busySeats: string[];

  ngOnInit(): void {
    this.refreshTariffs();
    this.refreshRoute();
    this.refreshSeats();
  }

  refreshTariffs() {
    this.service.getTariffsByAirlineId(this.data.airline_id).subscribe(data => {
      this.tariffs = data;
    })
  }

  refreshSeats() {
    this.service.getSeatsInfo(this.data.route_id).subscribe(data => {
      this.busySeats = data.map((m: any) => m.seat)
    });
  }

  refreshRoute() {
    this.service.getRouteById(this.data.route_id).subscribe(data => {
      this.route = data;
    })
  }
}