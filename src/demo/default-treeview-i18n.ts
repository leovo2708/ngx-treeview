import { Injectable } from '@angular/core';
import { TreeviewItem, TreeviewI18n } from '../lib';
import { I18n } from './i18n';

@Injectable()
export class DefaultTreeviewI18n extends TreeviewI18n {
    constructor(
        protected i18n: I18n
    ) {
        super();
    }

    getText(checkededItems: TreeviewItem[], isAll: boolean): string {
        if (isAll) {
            return this.i18n.language === 'en' ? 'All' : 'Tất cả';
        }

        switch (checkededItems.length) {
            case 0:
                return this.i18n.language === 'en' ? 'Select options' : 'Chọn mục';
            case 1:
                return checkededItems[0].text;
            default:
                return this.i18n.language === 'en'
                    ? `${checkededItems.length} options selected`
                    : `${checkededItems.length} mục đã được chọn`;
        }
    }

    allCheckboxText(): string {
        if (this.i18n.language === 'en') {
            return 'All';
        } else {
            return 'Tất cả';
        }
    }

    filterPlaceholder(): string {
        if (this.i18n.language === 'en') {
            return 'Filter';
        } else {
            return 'Lọc';
        }
    }

    filterNoItemsFoundText(): string {
        if (this.i18n.language === 'en') {
            return 'No items found';
        } else {
            return 'Không có mục nào được tìm thấy';
        }
    }

    tooltipCollapseExpand(isCollapse: boolean): string {
        return isCollapse
            ? this.i18n.language === 'en' ? 'Expand' : 'Mở rộng'
            : this.i18n.language === 'en' ? 'Collapse' : 'Thu lại';
    }
}
