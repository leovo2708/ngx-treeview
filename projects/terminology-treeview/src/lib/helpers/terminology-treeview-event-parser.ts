import { Injectable } from '@angular/core';
import { isNil } from 'lodash';
import { TerminologyTreeviewItem } from '../model/terminology-treeview-item';
import { TerminologyTreeViewComponent } from '../terminology-tree-view/terminology-tree-view.component';

@Injectable()
export abstract class TerminologyTreeviewEventParser {
  abstract getSelectedChange(component: TerminologyTreeViewComponent): any[];
}

@Injectable()
export class DefaultTerminologyTreeviewEventParser extends TerminologyTreeviewEventParser {
  getSelectedChange(component: TerminologyTreeViewComponent): any[] {
    const checkedItems = component.selection.checkedItems;
    if (!isNil(checkedItems)) {
      return checkedItems.map(item => item?.id);
    }

    return [];
  }
}

export interface TerminologyDownlineTreeviewItem {
  item: TerminologyTreeviewItem;
  parent: TerminologyDownlineTreeviewItem;
}

@Injectable()
export class DownlineTreeviewEventParser extends TerminologyTreeviewEventParser {
  getSelectedChange(component: TerminologyTreeViewComponent): any[] {
    const items = component.items;
    if (!isNil(items)) {
      let result: TerminologyDownlineTreeviewItem[] = [];
      items.forEach(item => {
        const links = this.getLinks(item, null);
        if (!isNil(links)) {
          result = result.concat(links);
        }
      });

      return result;
    }

    return [];
  }

  private getLinks(
    item: TerminologyTreeviewItem,
    parent: TerminologyDownlineTreeviewItem
  ): TerminologyDownlineTreeviewItem[] {
    if (!isNil(item.children)) {
      const link = {
        item,
        parent,
      };
      let result: TerminologyDownlineTreeviewItem[] = [];
      item.children.forEach(child => {
        const links = this.getLinks(child, link);
        if (!isNil(links)) {
          result = result.concat(links);
        }
      });

      return result;
    }

    if (item.checked) {
      return [
        {
          item,
          parent,
        },
      ];
    }

    return null;
  }
}

@Injectable()
export class TerminologyOrderDownlineTreeviewEventParser extends TerminologyTreeviewEventParser {
  private currentDownlines: TerminologyDownlineTreeviewItem[] = [];
  private parser = new DownlineTreeviewEventParser();

  getSelectedChange(component: TerminologyTreeViewComponent): any[] {
    const newDownlines: TerminologyDownlineTreeviewItem[] =
      this.parser.getSelectedChange(component);
    if (this.currentDownlines.length === 0) {
      this.currentDownlines = newDownlines;
    } else {
      const intersectDownlines: TerminologyDownlineTreeviewItem[] = [];
      this.currentDownlines.forEach(downline => {
        let foundIndex = -1;
        const length = newDownlines.length;
        for (let i = 0; i < length; i++) {
          if (downline.item.id === newDownlines[i].item.id) {
            foundIndex = i;
            break;
          }
        }

        if (foundIndex !== -1) {
          intersectDownlines.push(newDownlines[foundIndex]);
          newDownlines.splice(foundIndex, 1);
        }
      });

      this.currentDownlines = intersectDownlines.concat(newDownlines);
    }

    return this.currentDownlines;
  }
}
