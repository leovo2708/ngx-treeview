import { Injectable } from '@angular/core';
import { TreeviewItem } from 'ngx-treeview';

export class ProductService {
    getProducts(): TreeviewItem[] {
        const fruitCategory = new TreeviewItem({
            text: 'Fruit', value: 1, children: [
                { text: 'Apple', value: 11 },
                { text: 'Mango', value: 12 }
            ]
        });
        const vegetableCategory = new TreeviewItem({
            text: 'Vegetable', value: 2, children: [
                { text: 'Salad', value: 21 },
                { text: 'Potato', value: 22 }
            ]
        });
        vegetableCategory.children.push(new TreeviewItem({ text: 'Mushroom', value: 23, checked: false }));
        vegetableCategory.correctChecked(); // need this to make 'Vegetable' node to change checked value from true to false
        return [fruitCategory, vegetableCategory];
    }
}
