import { TreeviewSelection } from './treeview-item';
export declare abstract class TreeviewI18n {
    abstract getText(selection: TreeviewSelection): string;
    abstract getAllCheckboxText(): string;
    abstract getFilterPlaceholder(): string;
    abstract getFilterNoItemsFoundText(): string;
    abstract getTooltipCollapseExpandText(isCollapse: boolean): string;
}
export declare class TreeviewI18nDefault extends TreeviewI18n {
    getText(selection: TreeviewSelection): string;
    getAllCheckboxText(): string;
    getFilterPlaceholder(): string;
    getFilterNoItemsFoundText(): string;
    getTooltipCollapseExpandText(isCollapse: boolean): string;
}
