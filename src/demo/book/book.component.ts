import { Component, OnInit } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from '../../lib';
import { BookService } from './book.service';

@Component({
    selector: 'ngx-book',
    templateUrl: './book.component.html',
    providers: [
        BookService
    ]
})
export class BookComponent implements OnInit {
    dropdownEnabled = true;
    items: TreeviewItem[];
    values: number[];
    // config = TreeviewConfig.create({
    //     hasAllCheckBox: false,
    //     hasFilter: false,
    //     hasCollapseExpand: true,
    //     decoupleChildFromParent: false,
    //     maxHeight: 400
    // });

    config = TreeviewConfig.create({
        hasAllCheckBox: false,
        hasFilter: false,
        hasCollapseExpand: true,
        decoupleChildFromParent: true
    });

    buttonClasses = [
        'btn-outline-primary',
        'btn-outline-secondary',
        'btn-outline-success',
        'btn-outline-danger',
        'btn-outline-warning',
        'btn-outline-info',
        'btn-outline-light',
        'btn-outline-dark'
    ];
    buttonClass = this.buttonClasses[0];

    constructor(
        private service: BookService
    ) { }

    ngOnInit() {
        this.items = this.service.getBooks();
    }

    onFilterChange(value: string) {
        console.log('filter:', value);
    }
}
