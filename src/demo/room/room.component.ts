import { Component, OnInit } from '@angular/core';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { RoomService } from './room.service';

@Component({
    selector: 'ngx-room',
    template: `
<div class="row">
    <div class="col-12">
        <div class="alert alert-success" role="alert">
            Selected rooms: {{values}}
        </div>
    </div>
    <div class="col-12">
        <div class="form-group row">
            <label for="item-category" class="col-3 col-form-label">Item category</label>
            <div class="col-9">
                <ngx-dropdown-treeview [config]="config" [items]="items" (selectedChange)="values = $event">
                </ngx-dropdown-treeview>
            </div>
        </div>
    </div>
</div>
`, providers: [
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
