import { Injectable } from '@angular/core';
import { TreeviewItem } from 'ngx-treeview';

@Injectable()
export class RoomService {
    getRooms(): TreeviewItem[] {
        const items: TreeviewItem[] = [];
        for (let i = 0; i < 1000; i++) {
            const value: any = i === 0 ? { name: `${i}` } : i;
            const checked = i % 100 === 0;
            const item = new TreeviewItem({ text: `Room ${i}`, value: value, checked: checked });
            items.push(item);
        };
        return items;
    }
}
