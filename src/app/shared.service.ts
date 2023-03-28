import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from 'src/models/contact/contact.model';
import { Client } from 'src/models/client/client.model';
import { Passport } from 'src/models/passport/passport.model';
import { Registration } from 'src/models/registration/registration.model';

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

  getTariffsByAirlineId(id: number): Observable<any[]> {
    return this.http.get<any>(this.Url + 'Tariff?airline_id=' + id)
  }

  getAircraftById(id: number): Observable<any[]> {
    return this.http.get<any>(this.Url + 'Aircraft/' + id)
  }

  getCitysById(departureCity: number, arrivalCity: number) {
    return this.http.get<any>(this.Url + 'City?departureCity='+departureCity+'&arrivalCity='+arrivalCity)
  }

  getTariffById(id: number): Observable<any[]> {
    return this.http.get<any>(this.Url + 'Tariff/' + id)
  }
  
  getSeatsInfo(id: number): Observable<any[]> {
    return this.http.get<any>(this.Url + 'Registration?route_id=' + id)
  }

  getClientId(name: string, surname: string, lastname: string): Observable<any[]> {
    return this.http.get<any>(this.Url + 'Client?name='+name+'&surname='+surname+'&lastname='+lastname)
  }

  postClient(client: Client) {
    return this.http.post(this.Url + 'Client', client)
  }

  getContactId(email: string, number: string): Observable<any[]> {
    return this.http.get<any>(this.Url + 'Contact?email='+email+'&number='+number)
  }

  postContact(contact: Contact) {
    return this.http.post(this.Url + 'Contact', contact)
  }

  getPassportIdByNumber(number: string): Observable<any[]> {
    return this.http.get<any>(this.Url + 'Passport?number='+number)
  }

  postPassport(passport: Passport) {
    return this.http.post(this.Url + 'Passport', passport)
  }

  getRegistrationInfoBycode(code: string): Observable<any[]> {
    return this.http.get<any>(this.Url + 'Registration?code='+code)
  }

  postRegistration(registration: Registration) {
    return this.http.post(this.Url + 'Registration', registration)
  }

  updateRegistered(registration: Registration) {
    return this.http.patch(this.Url + 'Registration', registration);
  }
}
