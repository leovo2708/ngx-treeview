import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
        const url = 'https://raw.githubusercontent.com/leovo2708/ngx-treeview/master/src/demo/city/cities.json';
        return this.httpClient.get<City[]>(url);
    }
}
