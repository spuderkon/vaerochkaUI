import { AfterViewInit, Component, Input, OnInit, ViewChild, Inject } from '@angular/core';
import { Routeinf } from 'src/models/routeinf/routeinf.model';
import { SharedService } from '../shared.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tariff } from 'src/models/tariff/tariff.model';


export interface DialogData {
  airline_id: number;
}

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})


export class RouteComponent implements OnInit, AfterViewInit {
  @Input() departureDate: string;
  @Input() arrivalDate: string;
  @Input() departureCity: number;
  @Input() arrivalCity: number;



  displayedColumns: string[] = ['Departure', 'Arrive', 'Airline', 'Route', 'InJourney', 'Price', 'Button'];
  dataSource: MatTableDataSource<Routeinf>;
  PhotoUrl: string;
  routes: Routeinf[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: SharedService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.routes);

  }

  ngOnInit(): void {
    this.refreshData();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  refreshData() {
    if (this.departureCity == undefined) {
      this.service.getRoutesBy3Parameters(36, 1, '2022-12-26').subscribe(data => {
        this.routes = data;
        this.dataSource = new MatTableDataSource(this.routes);
        console.log(data);
      });
    }
    else {
      this.service.getRoutesBy3Parameters(this.departureCity, this.arrivalCity, this.departureDate).subscribe(data => {
        this.routes = data;
        this.dataSource = new MatTableDataSource(this.routes);
        console.log(data);
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(airline_id: number) : void {
    const dialogRef = this.dialog.open(routeDialog, {data: {airline_id: airline_id}});
  }
}

@Component({
  selector: 'routeDialog',
  templateUrl: 'routeDialog.html',
})
export class routeDialog implements OnInit{

  constructor(private service: SharedService,
              public dialogRef: MatDialogRef<routeDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,){

  }
  tariffs: Tariff[];

  ngOnInit(): void {
   this.refreshData();
  }

  refreshData(){
    this.service.getTariffsById(this.data.airline_id).subscribe(data => {
      this.tariffs = data;
      console.log(this.tariffs);
    })
  }
}