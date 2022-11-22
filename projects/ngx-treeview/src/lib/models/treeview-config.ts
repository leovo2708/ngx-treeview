import { Injectable } from '@angular/core';

export interface ITreeviewVirtualScroll {
  enable: boolean;
  containerHeight: number;
  itemHeight: number;
  itemMargin?: string;
}

@Injectable()
export class TreeviewConfig {
  hasAllCheckBox = true;
  hasFilter = false;
  hasCollapseExpand = false;
  decoupleChildFromParent = false;
  maxHeight = 500;
  virtualScroll: ITreeviewVirtualScroll = {
    enable: false,
    containerHeight: 500,
    itemHeight: 50,
  };

  get hasDivider(): boolean {
    return this.hasFilter || this.hasAllCheckBox || this.hasCollapseExpand;
  }

  public static create(fields?: {
    hasAllCheckBox?: boolean,
    hasFilter?: boolean,
    hasCollapseExpand?: boolean,
    decoupleChildFromParent?: boolean
    maxHeight?: number,
    virtualScroll?: ITreeviewVirtualScroll,
  }): TreeviewConfig {
    const config = new TreeviewConfig();
    Object.assign(config, fields);
    return config;
  }
}
