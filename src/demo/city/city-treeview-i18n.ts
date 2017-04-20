import { Injectable } from '@angular/core';
import { TreeviewItem } from 'ngx-treeview';
import { I18n } from '../i18n';
import { DefaultTreeviewI18n } from '../default-treeview-i18n';

@Injectable()
export class CityTreeviewI18n extends DefaultTreeviewI18n {
    constructor(
        protected i18n: I18n
    ) {
        super(i18n);
    }

    getText(checkededItems: TreeviewItem[], isAll: boolean): string {
        if (isAll) {
            return this.i18n.language === 'en' ? 'All cities' : 'Tất cả thành phố';
        }

        switch (checkededItems.length) {
            case 0:
                return this.i18n.language === 'en' ? 'Select cities' : 'Chọn thành phố';
            case 1:
                return checkededItems[0].text;
            default:
                return this.i18n.language === 'en'
                    ? `${checkededItems.length} cities selected`
                    : `${checkededItems.length} thành phố đã được chọn`;
        }
    }

    allCheckboxText(): string {
        return super.allCheckboxText();
    }

    filterPlaceholder(): string {
        return super.filterPlaceholder();
    }

    filterNoItemsFoundText(): string {
        if (this.i18n.language === 'en') {
            return 'No cities found';
        } else {
            return 'Không có thành phố nào được tìm thấy';
        }
    }

    tooltipCollapseExpand(isCollapse: boolean): string {
        return super.tooltipCollapseExpand(isCollapse);
    }
}
