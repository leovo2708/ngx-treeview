import { concat, isNil, pull } from 'lodash';
import { TerminologyTreeviewItem } from '../model/terminology-treeview-item';

export const TerminologyTreeviewHelper = {
  findTerminologyItem,
  findTerminologyItemInList,
  findTerminologyParent,
  removeTerminologyItem,
  concatTerminologySelection,
};

function findTerminologyItem(
  root: TerminologyTreeviewItem,
  id: any
): TerminologyTreeviewItem {
  if (isNil(root)) {
    return undefined;
  }

  if (root.id === id) {
    return root;
  }

  if (root.children) {
    for (const child of root.children) {
      const foundItem = findTerminologyItem(child, id);
      if (foundItem) {
        return foundItem;
      }
    }
  }

  return undefined;
}

function findTerminologyItemInList(
  list: TerminologyTreeviewItem[],
  id: any
): TerminologyTreeviewItem {
  if (isNil(list)) {
    return undefined;
  }

  for (const item of list) {
    const foundItem = findTerminologyItem(item, id);
    if (foundItem) {
      return foundItem;
    }
  }

  return undefined;
}

function findTerminologyParent(
  root: TerminologyTreeviewItem,
  item: TerminologyTreeviewItem
): TerminologyTreeviewItem {
  if (isNil(root) || isNil(root.children)) {
    return undefined;
  }

  for (const child of root.children) {
    if (child === item) {
      return root;
    } else {
      const parent = findTerminologyParent(child, item);
      if (parent) {
        return parent;
      }
    }
  }

  return undefined;
}

function removeTerminologyItem(
  root: TerminologyTreeviewItem,
  item: TerminologyTreeviewItem
): boolean {
  const parent = findTerminologyParent(root, item);
  if (parent) {
    pull(parent.children, item);
    if (parent.children.length === 0) {
      parent.children = undefined;
    } else {
      parent.correctChecked();
    }
    return true;
  }

  return false;
}

function concatTerminologySelection(
  items: TerminologyTreeviewItem[],
  checked: TerminologyTreeviewItem[],
  unchecked: TerminologyTreeviewItem[]
): { [k: string]: TerminologyTreeviewItem[] } {
  let checkedItems = [...checked];
  let uncheckedItems = [...unchecked];
  for (const item of items) {
    const selection = item.getSelection();
    checkedItems = concat(checkedItems, selection.checkedItems);
    uncheckedItems = concat(uncheckedItems, selection.uncheckedItems);
  }
  return {
    checked: checkedItems,
    unchecked: uncheckedItems,
  };
}
