export interface TreeviewSelection {
    checkedItems: TreeviewItem[];
    uncheckedItems: TreeviewItem[];
}
export interface TreeItem {
    text: string;
    value: any;
    disabled?: boolean;
    checked?: boolean;
    collapsed?: boolean;
    children?: TreeItem[];
}
export declare class TreeviewItem {
    private internalDisabled;
    private internalChecked;
    private internalCollapsed;
    private internalChildren;
    text: string;
    value: any;
    constructor(item: TreeItem, autoCorrectChecked?: boolean);
    checked: boolean;
    readonly indeterminate: boolean;
    setCheckedRecursive(value: boolean): void;
    disabled: boolean;
    collapsed: boolean;
    setCollapsedRecursive(value: boolean): void;
    children: TreeviewItem[];
    getSelection(): TreeviewSelection;
    correctChecked(): void;
    private getCorrectChecked();
}
