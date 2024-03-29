import { AfterViewInit, Component, Input, OnInit, ViewChild, Inject, OnChanges, SimpleChanges, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
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
  styleUrls: ['./route.component.css'],
  encapsulation: ViewEncapsulation.None,
})


export class RouteComponent implements OnInit, AfterViewInit, OnChanges {
  @Output() routeIsSelectedChange = new EventEmitter<boolean>();
  @Output() routesListIsFullChange = new EventEmitter<boolean>();
  @Output('regInfo') regInfo = new EventEmitter<{ currentRoute: any, choosedTariff: any, totalPrice: number | null, busySeats: string[] | null }>();
  @Input('depCityToChild') depCity: number;
  @Input('arrCityToChild') arrCity: number;
  @Input('depDateToChild') depDate: string;

  displayedColumns: string[] = ['Departure', 'Arrive', 'Airline', 'Route', 'InJourney', 'Price', 'Seats', 'Button'];
  dataSource: MatTableDataSource<Routeinf>;
  PhotoUrl: string;
  routes: Routeinf[];
  depCityAsString: string;
  arrCityAsString: string;
  busySeats: string[];
  choosedRoute: any;

  tariffChoosed: boolean = false;
  routeIsSelected: boolean = false;
  routesListIsFull: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: SharedService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.routes);

  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refreshRoutes();
    this.refreshCitys();
  }

  refreshRoutes() {
    this.service.getRoutesBy3Parameters(this.depCity, this.arrCity, this.depDate).subscribe(data => {
      if (data.length == 0) {
        this.tariffChoosed = false;
        this.routeIsSelected = false;
        this.routesListIsFull = false;
        this.routes = new Array<Routeinf>;
        this.dataSource = new MatTableDataSource();
        this.routeIsSelectedChange.emit(this.routeIsSelected);
        this.routesListIsFullChange.emit(this.routesListIsFull);
        this.regInfo.emit({ currentRoute: null, choosedTariff: null, totalPrice: null, busySeats: null, });
      }
      else {
        this.routes = data;
        this.routes.forEach(x => {
          x.isChoosed = false;
        });
        this.tariffChoosed = false;
        this.routeIsSelected = false;
        this.routesListIsFull = true;
        this.dataSource = new MatTableDataSource(this.routes);
        this.routeIsSelectedChange.emit(this.routeIsSelected);
        this.routesListIsFullChange.emit(this.routesListIsFull);
      }
    });
  }

  convertNumberToTime(value: number): string {
    let hours = Math.floor(value / 60);
    let minutes = Math.floor(value % 60);
    return hours + ' ч., ' + minutes + ' мин.';
  }

  routeIsChoosedChange(id: number, change: boolean): void {
    if (change) {
      let x = this.routes.filter(x => x.route_id == id)
      this.routes.forEach(item => {
        if (x[0] == item) {
          item.isChoosed = true;
        }
      });
    }
    else {
      let x = this.routes.filter(x => x.route_id == id)
      this.routes.forEach(item => {
        if (x[0] == item) {
          item.isChoosed = false;
        }
      });
    }
  }

  unselectRoute(id: number): void {
    this.routeIsChoosedChange(id, false);
    this.tariffChoosed = false;
    this.routeIsSelected = false;
    this.routesListIsFull = true;
    this.routeIsSelectedChange.emit(this.routeIsSelected);
    this.routesListIsFullChange.emit(this.routesListIsFull);
    this.regInfo.emit({ currentRoute: null, choosedTariff: null, totalPrice: null, busySeats: null });
  }

  refreshCitys() {
    this.service.getCitysById(this.depCity, this.arrCity).subscribe(data => {
      this.depCityAsString = data.map((m: any) => m.departure);
      this.arrCityAsString = data.map((m: any) => m.arrival);
    });
  }

  openDialog(airline_id: number, price: number, route_id: number): void {
    const dialogRef = this.dialog.open(routeDialog, { data: { airline_id: airline_id, price: price, route_id: route_id }, height: '530px', width: '900px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.routeIsChoosedChange(route_id, true);
        this.tariffChoosed = true;
        this.routeIsSelected = true;
        this.routesListIsFull = true;
        this.routeIsSelectedChange.emit(this.routeIsSelected);
        this.routesListIsFullChange.emit(this.routesListIsFull);
        this.regInfo.emit({ currentRoute: result[0][0], choosedTariff: result[1], totalPrice: result[2], busySeats: result[3] });
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

  qwe(qwe: any): void {
    console.log(qwe);
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