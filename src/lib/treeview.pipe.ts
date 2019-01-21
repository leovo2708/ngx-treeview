import { Pipe, PipeTransform } from '@angular/core';
import { isNil } from 'lodash';
import { TreeviewItem } from './treeview-item';

@Pipe({
    name: 'ngxTreeview'
})
export class TreeviewPipe implements PipeTransform {
    transform(objects: any[], textField: string): TreeviewItem[] {
        if (isNil(objects)) {
            return undefined;
        }

        return objects.map(object => {
            const baseObject: any = { text: object[textField], value: object };

            if (baseObject.value.checked !== undefined) {
                baseObject.checked = object.checked;
            }

            const treeviewItem = new TreeviewItem(baseObject);

            return treeviewItem;
        });
    }
}
