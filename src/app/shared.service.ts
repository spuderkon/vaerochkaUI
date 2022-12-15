import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly Url = "http://localhost:49975/api/"
  readonly PhotoURl = "http://localhost:49975/photos/"

  constructor(private http: HttpClient) {

  }

  getAirports(): Observable<any[]> {
    return this.http.get<any>(this.Url + "airports")
  }
}
