import { TreeviewItem, TreeviewI18nDefault } from '../../lib';

export class DropdownTreeviewSelectI18n extends TreeviewI18nDefault {
    private _selectedItem: TreeviewItem;

    set selectedItem(value: TreeviewItem) {
        if (value && value.children === undefined) {
            this._selectedItem = value;
        }
    }

    get selectedItem(): TreeviewItem {
        return this._selectedItem;
    }

    getText(checkededItems: TreeviewItem[], isAll: boolean): string {
        return this._selectedItem ? this._selectedItem.text : 'All';
    }
}
