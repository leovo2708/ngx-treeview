import { TreeviewItem } from './treeview-item';
import { TreeviewComponent } from './treeview.component';
export declare abstract class TreeviewEventParser {
    abstract getSelectedChange(component: TreeviewComponent): any[];
}
export declare class DefaultTreeviewEventParser extends TreeviewEventParser {
    getSelectedChange(component: TreeviewComponent): any[];
}
export interface DownlineTreeviewItem {
    item: TreeviewItem;
    parent: DownlineTreeviewItem;
}
export declare class DownlineTreeviewEventParser extends TreeviewEventParser {
    getSelectedChange(component: TreeviewComponent): any[];
    private getLinks(item, parent);
}
export declare class OrderDownlineTreeviewEventParser extends TreeviewEventParser {
    private currentDownlines;
    private parser;
    getSelectedChange(component: TreeviewComponent): any[];
}
