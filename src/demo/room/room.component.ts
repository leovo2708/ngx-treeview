import { Component, OnInit } from '@angular/core';
import { TreeviewConfig, TreeviewItem } from '../../lib';
import { RoomService } from './room.service';

@Component({
    selector: 'ngx-room',
    templateUrl: './room.component.html',
    providers: [
        RoomService
    ]
})
export class RoomComponent implements OnInit {
    items: TreeviewItem[];
    values: any[];
    config: TreeviewConfig = {
        isShowAllCheckBox: true,
        isShowFilter: true,
        isShowCollapseExpand: false,
        maxHeight: 500
    };

    constructor(
        private service: RoomService
    ) { }

    ngOnInit() {
        this.items = this.service.getRooms();
    }
}
