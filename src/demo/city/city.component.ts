import { Component, OnInit } from '@angular/core';
import { TreeviewI18n } from '../../lib';
import { City, CityService } from './city.service';
import { CityTreeviewI18n } from './city-treeview-i18n';

@Component({
    selector: 'ngx-city',
    templateUrl: './city.component.html',
    providers: [
        CityService,
        { provide: TreeviewI18n, useClass: CityTreeviewI18n }
    ]
})
export class CityComponent implements OnInit {
    cities: City[];
    values: City[];

    constructor(
        private service: CityService
    ) { }

    ngOnInit() {
        this.cities = this.service.getCities();
    }
}
