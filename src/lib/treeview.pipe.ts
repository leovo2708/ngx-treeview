import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { TreeviewItem } from './treeview-item';

@Pipe({
    name: 'ngxTreeview'
})
export class TreeviewPipe implements PipeTransform {
    transform(objects: any[], textField: string): TreeviewItem[] {
        if (_.isNil(objects)) {
            return undefined;
        }

        return objects.map(object => new TreeviewItem({ text: object[textField], value: object }));
    }
}
