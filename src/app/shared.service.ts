import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly Url = "http://localhost:49975/api/"
  readonly PhotoURl = "C:\\Users\\Spude\\Desktop\\vaerochkaUI\\"


  constructor(private http: HttpClient) {

  }

  getAirports(): Observable<any[]> {
    return this.http.get<any>(this.Url + "airports")
  }

  getRoutesBy4Parameters(departureCity: number, arrivalCity: number, departureDate: string, arrivalDate: string): Observable<any[]> {
    return this.http.get<any>(this.Url + "Route?departureCity=" + departureCity + "&arrivalCity=" + arrivalCity + "&departureDate=" + departureDate + "&arrivalDate=" + arrivalDate)
  }
  getRoutesBy3Parameters(departureCity: number, arrivalCity: number, departureDate: string): Observable<any[]> {
    return this.http.get<any>(this.Url + "Route?departureCity=" + departureCity + "&arrivalCity=" + arrivalCity + "&departureDate=" + departureDate)
  }

  getRouteById(id: number): Observable<any[]> {
    return this.http.get<any>(this.Url + "Route/" + id)
  }

  getTariffsById(id: number): Observable<any[]> {
    return this.http.get<any>(this.Url + 'Tariff?airline_id=' + id)
  }

  getAircraftById(id: number): Observable<any[]> {
    return this.http.get<any>(this.Url + 'Aircraft/' + id)
  }

  getCitysById(departureCity: number, arrivalCity: number) {
    return this.http.get<any>(this.Url + 'City?departureCity='+departureCity+'&arrivalCity='+arrivalCity)
  }
}
