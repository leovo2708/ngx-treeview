import { Component, OnInit } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from '../../lib';
import { BookService } from '../book/book.service';

@Component({
    selector: 'ngx-dropdown-treeview-select-demo',
    templateUrl: './dropdown-treeview-select-demo.component.html',
    providers: [
        BookService
    ]
})
export class DropdownTreeviewSelectDemoComponent implements OnInit {
    value = 1;
    items: TreeviewItem[];
    config = TreeviewConfig.create({
        hasFilter: true,
        hasCollapseExpand: true
    });

    constructor(
        private bookService: BookService
    ) { }

    ngOnInit() {
        this.items = this.bookService.getBooks();
    }

    onValueChange(value: number) {
        console.log('valueChange raised with value: ' + value);
    }

    loadBooks1() {
        this.items = this.bookService.getBooks();
        this.value = 1;
    }

    loadBooks2() {
        this.items = [new TreeviewItem({
            text: 'ABC',
            value: 123456
        })];
        this.value = undefined;
    }
}
