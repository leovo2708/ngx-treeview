import { Injectable } from '@angular/core';
import { TreeviewItem } from './treeview-item';

@Injectable()
export abstract class TreeviewI18n {
    abstract getText(checkededItems: TreeviewItem[], isAll: boolean): string;
    abstract allCheckboxText(): string;
    abstract filterPlaceholder(): string;
    abstract filterNoItemsFoundText(): string;
    abstract tooltipCollapseExpand(isCollapse: boolean): string;
}

@Injectable()
export class TreeviewI18nDefault extends TreeviewI18n {
    getText(checkededItems: TreeviewItem[], isAll: boolean): string {
        if (isAll) {
            return 'All';
        }

        switch (checkededItems.length) {
            case 0:
                return 'Select options';
            case 1:
                return checkededItems[0].text;
            default:
                return `${checkededItems.length} options selected`;
        }
    }

    allCheckboxText(): string {
        return 'All';
    }

    filterPlaceholder(): string {
        return 'Filter';
    }

    filterNoItemsFoundText(): string {
        return 'No items found';
    }

    tooltipCollapseExpand(isCollapse: boolean): string {
        return isCollapse ? 'Expand' : 'Collapse';
    }
}
