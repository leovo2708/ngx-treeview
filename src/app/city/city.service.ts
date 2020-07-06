import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import cities from './cities.json';

export interface City {
  id: number;
  name: string;
  postCode: number;
}

@Injectable()
export class CityService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getCities(): Observable<City[]> {
    if (location.hostname === 'localhost') {
      return of(cities as City[]);
    } else {
      const url = 'https://raw.githubusercontent.com/leovo2708/ngx-treeview/master/src/app/city/cities.json';
      return this.httpClient.get<City[]>(url);
    }
  }
}
