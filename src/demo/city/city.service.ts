import { Injectable } from '@angular/core';

export interface City {
    id: number;
    name: string;
    postCode: number;
}

@Injectable()
export class CityService {
    getCities(): City[] {
        return [
            {
                id: 1,
                name: 'Ho Chi Minh',
                postCode: 700000
            },
            {
                id: 2,
                name: 'Ha Noi',
                postCode: 100000
            },
            {
                id: 3,
                name: 'Da Nang',
                postCode: 550000
            }
        ];
    }
}
