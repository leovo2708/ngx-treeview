import { Injectable } from '@angular/core';
import { TreeviewItem, TreeviewSelection } from '../../lib';
import { I18n } from '../i18n';
import { DefaultTreeviewI18n } from '../default-treeview-i18n';

@Injectable()
export class CityTreeviewI18n extends DefaultTreeviewI18n {
    constructor(
        protected i18n: I18n
    ) {
        super(i18n);
    }

    getText(selection: TreeviewSelection): string {
        if (selection.uncheckedItems.length === 0) {
            return this.i18n.language === 'en' ? 'All cities' : 'Tất cả thành phố';
        }

        switch (selection.checkedItems.length) {
            case 0:
                return this.i18n.language === 'en' ? 'Select cities' : 'Chọn thành phố';
            case 1:
                return selection.checkedItems[0].text;
            default:
                return this.i18n.language === 'en'
                    ? `${selection.checkedItems.length} cities selected`
                    : `${selection.checkedItems.length} thành phố đã được chọn`;
        }
    }

    getFilterNoItemsFoundText(): string {
        if (this.i18n.language === 'en') {
            return 'No cities found';
        } else {
            return 'Không có thành phố nào được tìm thấy';
        }
    }
}
