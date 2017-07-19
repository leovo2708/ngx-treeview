<a name="0.0.3"></a>
# [0.0.3](https://www.npmjs.com/package/ngx-treeview) (2017-04-20)

### Upgrade project for Angular 4 from my old component: [ng2-dropdown-treeview](https://www.npmjs.com/package/ng2-dropdown-treeview)

# [0.0.5](https://www.npmjs.com/package/ngx-treeview) (2017-05-25)

### Enhancement: 
* Item always expands when matching search filter.

# [1.0.6](https://www.npmjs.com/package/ngx-treeview) (2017-07-10)

### Enhancement: 
* Build bundles.
* 100% code coverage.

# [1.0.7](https://www.npmjs.com/package/ngx-treeview) (2017-07-19)

### Enhancement:
* Template for header
```js
export interface TreeviewHeaderTemplateContext {
    config: TreeviewConfig;
    item: TreeviewItem;
    onCollapseExpand: () => void;
    onCheckedChange: (checked: boolean) => void;
    onFilterTextChange: (text: string) => void;
}
```
### Refactoring:
* Changes on interface of Treeview
```js
export interface TreeviewItemTemplateContext {
    item: TreeviewItem;
    onCollapseExpand: () => void;
    onCheckedChange: () => void;
}
```
* Changes on TreeviewConfig
```js
export class TreeviewConfig {
    hasAllCheckBox = true;
    hasFilter = false;
    hasCollapseExpand = false;
    maxHeight = 500;
}
```
### Demo:
* Example for dropdown-treeview-select component.