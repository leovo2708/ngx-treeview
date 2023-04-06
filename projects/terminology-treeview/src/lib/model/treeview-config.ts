import { Injectable } from '@angular/core';

@Injectable()
export class TreeviewConfig {
  hasAllCheckBox = false;
  hasCollapseExpand = false;
  decoupleChildFromParent = false;
  maxHeight = 500;
  hasElementCheckBox = false;

  get hasDivider(): boolean {
    return this.hasAllCheckBox || this.hasCollapseExpand;
  }

  public static create(fields?: {
    hasAllCheckBox?: boolean;
    hasFilter?: boolean;
    hasCollapseExpand?: boolean;
    decoupleChildFromParent?: boolean;
    maxHeight?: number;
    hasElementCheckBox?: boolean;
  }): TreeviewConfig {
    const config = new TreeviewConfig();
    Object.assign(config, fields);
    return config;
  }
}
