import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Routeinf } from 'src/models/routeinf/routeinf.model';
import { SharedService } from '../shared.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Qwe } from 'src/models/qwe.model';


@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})


export class RouteComponent implements OnInit, AfterViewInit  {
    @Input() qwer: Qwe;
    displayedColumns: string[] = ['Departure', 'Arrive', 'Airline', 'Route', 'InJourney', 'Price', 'Button'];
    dataSource: MatTableDataSource<Routeinf>;
    PhotoUrl : string;
    routes : Routeinf[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

  constructor(private service: SharedService) {
      this.dataSource = new MatTableDataSource(this.routes);
   }

  ngOnInit(): void {
    this.refreshData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  refreshData(){
    this.service.getRoutesBy3Parameters(this.qwer.departureCity, this.qwer.arrivalCity,this.qwer.departureDate).subscribe(data => {
      this.routes = data;
      this.dataSource = new MatTableDataSource(this.routes);
      console.log(data);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
