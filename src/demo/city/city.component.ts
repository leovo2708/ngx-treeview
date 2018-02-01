import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeviewI18n, DropdownTreeviewComponent } from '../../lib';
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
    @ViewChild(DropdownTreeviewComponent) dropdownTreeviewComponent: DropdownTreeviewComponent;
    cities: City[];
    selectedCities: City[];
    unselectedCities: City[];

    constructor(
        private service: CityService
    ) { }

    ngOnInit() {
        this.service.getCities().subscribe(cities => {
            this.cities = cities;
        });
    }

    onSelectedChange(selectedCities: City[]) {
        this.selectedCities = selectedCities;
        const uncheckedItems = this.dropdownTreeviewComponent.treeviewComponent.selection.uncheckedItems;
        this.unselectedCities = uncheckedItems.map(item => item.value);
    }
}
