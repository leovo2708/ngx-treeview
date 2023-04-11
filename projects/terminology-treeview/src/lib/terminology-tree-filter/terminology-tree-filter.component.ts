/**
 * Minimal mock of the new select component with multi selection mode to allow rendering of custom content in the options' panel
 * 3-4-2023
 */

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import {
  InputComponentWrapper,
  InputHighlight,
  InputSize,
  isElementInvalid,
} from '@orbis-u/components/input';
import { NewSelectDisplayMode } from '@orbis-u/components/new-select';
import { Subscription, take } from 'rxjs';
import {
  OnChangeCallback,
  OnTouchedCallback,
  OverlayProvidingComponent,
  OverlayRef,
  OverlayRegistry,
  OverlayService,
} from '@orbis-u/common/cdk';
import { isNullOrUndefined } from '@orbis-u/common';
import { BadgeComponent } from '@orbis-u/components/badge';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { TerminologyTreeviewItem } from '../model/terminology-treeview-item';
import { TreeviewConfig } from '../model/treeview-config';
import { TerminologyTreeviewItemTemplateContext } from '../model/terminology-treeview-item-template-context';
import { TreeViewSelectHelperService } from '../services/tree-view-select-helper.service';

@Component({
  selector: 'edutr-terminology-tree-filter',
  templateUrl: './terminology-tree-filter.component.html',
  styleUrls: ['./terminology-tree-filter.component.scss'],
  providers: [
    TreeViewSelectHelperService,
    {
      provide: OverlayProvidingComponent,
      useExisting: TerminologyTreeFilterComponent,
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TerminologyTreeFilterComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: TerminologyTreeFilterComponent,
      multi: true,
    },
  ],
})
export class TerminologyTreeFilterComponent
  extends InputComponentWrapper<string>
  implements
    OnInit,
    AfterViewInit,
    OnChanges,
    OnDestroy,
    OverlayProvidingComponent,
    ControlValueAccessor
{
  /**
   * tree related inputs
   */
  @Input() edutrConfig: TreeviewConfig = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 400,
    hasElementCheckBox: false,
  });
  @Input() edutrTemplate: TemplateRef<TerminologyTreeviewItemTemplateContext>;
  @Input() edutrItems: TerminologyTreeviewItem;
  values = [];
  /**
   * tree related outputs
   */
  @Output() edutrCheckedChange = new EventEmitter<boolean>();
  @Output() edutrSelectedChange = new EventEmitter<any[]>();
  @Output() edutrFilterChange = new EventEmitter<string>();
  /**
   * internal input field related
   */
  @Input() edutrHighlight: InputHighlight = '';
  @Input() edutrSize: InputSize = '';
  @Input() edutrDisabled: boolean = false;
  @Input() edutrRequired: boolean = false;
  @Input() edutrDisplayMode: NewSelectDisplayMode = 'overlay';
  @Input() edutrReadOnly: boolean = false;
  @Input() edutrPlaceholder: string = '';
  @Input() edutrEnableCloseOverlayOnBlur = true;
  @Input() edutrActive: any = {};
  @Input() edutrFilterText = '';
  @Input() edutrShowClearButton: boolean = true;

  @Output() emitEdutrFilterText: EventEmitter<string> =
    new EventEmitter<string>();

  edutrMaxHeight = '212px';
  edutrDebounceInputTime = 350;

  edutrMinQueryLength = 3;
  edutrQuery = '';

  isLoading = false;
  selectedBadges: TemplateRef<any>;

  selected: TerminologyTreeviewItem[] = [];
  inputFocused: boolean = false;

  private overlayRef: OverlayRef;
  private optionsContainerViewRef: EmbeddedViewRef<void>;

  @ViewChild('inputElement')
  private inputElement: ElementRef<HTMLInputElement>;

  @ViewChild('optionsContainer')
  optionsContainer: TemplateRef<void>;

  @ViewChild('toggleButton')
  private toggleButton: ElementRef;

  @ViewChildren(BadgeComponent)
  private badgeElementList: QueryList<BadgeComponent>;

  @ViewChild('divElement')
  private optionsPanel: ElementRef<HTMLDivElement>;

  /** @internal */
  get overlayRootElement(): ElementRef {
    return this.elementRef;
  }

  /** @internal */
  protected onChange: OnChangeCallback<any[]> = _ => {};

  /** @internal */
  protected onTouched: OnTouchedCallback = () => {};

  private subscriptions: Subscription[] = [];

  constructor(
    private elementRef: ElementRef,
    private overlayService: OverlayService,
    private injector: Injector,
    private cdr: ChangeDetectorRef,
    private overlayRegistry: OverlayRegistry,
    private treeViewSelectHelperService: TreeViewSelectHelperService
  ) {
    super();
  }

  ngOnInit(): void {
    this.overlayRegistry.add(this);
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (this.inputFocused) {
      this.showOptionsPanel(true);
    }
  }

  ngOnDestroy(): void {
    this.overlayRegistry.remove(this);
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.edutrDisabled || this.edutrReadOnly) {
      this.closeOverlay();
    }
  }

  /** ControlValueAccessor **/
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(selected: any[]): void {
    this.validateControlValue(selected);
    this.selected = selected ? selected : [];
    this.cdr.markForCheck();
  }

  isEventTriggeredInsideOverlay(event: Event): boolean {
    return (
      this.isOverlayOpen() &&
      event.target instanceof HTMLElement &&
      this.overlayRef.getHostElement().contains(event.target)
    );
  }

  private validateControlValue(selected: any[]) {
    if (!isNullOrUndefined(selected) && !Array.isArray(selected)) {
      throw new Error('terminology-tree: the selection value must be an array');
    }
  }

  isMultiSelection() {
    return true;
  }

  private enableVirtualKeyboard() {
    this.inputElement.nativeElement.inputMode = 'search';
  }

  onBlur(event?: FocusEvent) {
    this.edutrActive = undefined;
    this.closeOverlay();
    this.onTouched();
    this.inputFocused = false;
    this.enableVirtualKeyboard();
  }

  private contains(eventTarget?: EventTarget): boolean {
    const targetElement: HTMLElement | undefined =
      eventTarget instanceof HTMLElement ? eventTarget : undefined;

    return (
      this.elementRef.nativeElement.contains(eventTarget) ||
      this.overlayRef?.getHostElement()?.contains(targetElement)
    );
  }

  private onOutsideOverlayPointerEvent(event: PointerEvent): void {
    if (this.shouldBlur(event.target)) {
      this.onBlur(event);
    }
  }

  isOverlayOpen(): boolean {
    return this.edutrDisplayMode === 'overlay' && this.isOptionsPanelOpen();
  }

  private shouldBlur(eventTarget?: EventTarget): boolean {
    return (
      this.edutrEnableCloseOverlayOnBlur &&
      (!isNullOrUndefined(eventTarget) ||
        this.edutrDisplayMode === 'expanded' ||
        !this.isOverlayOpen()) &&
      (!this.contains(eventTarget) ||
        this.toggleButton?.nativeElement === eventTarget)
    );
  }

  onInputFocus() {
    this.inputFocused = true;
  }

  onInputBlur(event: FocusEvent) {
    if (this.shouldBlur(event.relatedTarget)) {
      this.onBlur(event);
    }
  }

  onInputClick() {
    this.enableVirtualKeyboard();
    this.showOptionsPanel(true);
  }

  onKeydown(event: KeyboardEvent) {
    if (this.edutrDisabled || this.edutrReadOnly) {
    } else if (this.edutrActive && event.key === 'ArrowRight') {
      event.preventDefault();
    } else if (
      this.edutrActive &&
      (event.key === 'Tab' || event.key === 'Enter')
    ) {
      event.preventDefault();
      if (
        !this.edutrActive.disabled
        // && !(event.key === 'Tab' && this.isOptionSelected(this.edutrActive))
      ) {
        // this.selectOption(this.edutrActive);
      }
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
    } else if (event.key === 'Escape') {
    } else if (event.key === 'Tab') {
      this.onBlur();
    }
  }

  showClearButton() {
    return this.edutrShowClearButton;
  }

  clearButtonClick() {
    this.selected = [];
    this.edutrFilterText = '';
    this.edutrActive = undefined;
    this.treeViewSelectHelperService.updateEdutrFilterTextChange({
      value: true,
      text: '',
    });
    // this.clearAndFetchOptions();
    setTimeout(() => {
      this.overlayRef?.updatePosition();
    });
    // this.emitSelection();
  }

  onEdutrItemClicked(item: TerminologyTreeviewItem | any) {
    this.selected.push(item);
  }

  isOptionsPanelOpen() {
    return (
      (this.edutrDisplayMode === 'overlay' && this.overlayRef !== undefined) ||
      this.edutrDisplayMode === 'expanded'
    );
  }

  isMaxSelectionCountReached() {
    return false;
  }

  onToggleButtonMouseDown(event: MouseEvent) {
    if (
      !this.edutrDisabled &&
      !this.edutrReadOnly &&
      !this.isOptionsPanelOpen()
    ) {
      event.preventDefault();
      this.disableVirtualKeyboard();
      this.inputElement.nativeElement.focus();
      this.showOptionsPanel(true);
    } else {
      this.closeOverlay();
    }
  }

  onToggleButtonKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      this.inputElement.nativeElement.focus();
      this.inputElement.nativeElement.click();
    }
  }

  showIntegratedSelectionContainer() {
    return true;
  }

  hasInvalidClass() {
    return isElementInvalid(this.elementRef.nativeElement);
  }

  getDisplayedText(item: any) {
    return item.meaning;
  }

  removeSelectedOption(
    option: any,
    clearInput: boolean = true,
    openOptionsPanel: boolean = true
  ) {
    this.selected = this.selected.filter(value => value !== option);
    setTimeout(() => this.overlayRef?.updatePosition());
  }

  onBadgeFocusIn(index: number) {}

  onBadgeFocusOut(index: number) {}

  private disableVirtualKeyboard() {
    this.inputElement.nativeElement.inputMode = 'none';
  }

  private showOptionsPanel(showPanel: boolean) {
    if (this.edutrDisabled || this.edutrReadOnly) {
    } else if (this.edutrDisplayMode === 'overlay') {
      if (showPanel) {
        this.showOptionsInOverlay();
      } else {
        this.closeOverlay();
      }
    } else {
      this.showOptionsInViewContainerRef(showPanel);
    }
  }

  private showOptionsInViewContainerRef(showPanel: boolean) {
    // if (showPanel && !this.optionsPanel) {
    //   this.contentCreator(this.getExpandedOptionsVc());
    // }
  }

  onFilterTextChange(text: string): void {
    this.treeViewSelectHelperService.updateEdutrFilterTextChange({
      value: true,
      text: text,
    });
  }

  private showOptionsInOverlay() {
    const hostElement: HTMLElement =
      this.inputComponent.getOverlayHostElement();
    if (!this.overlayRef) {
      this.overlayRef = this.overlayService.open({
        hostElement: hostElement,
        contentCreator: viewContainerRef =>
          this.contentCreator(viewContainerRef),
        injector: this.injector,
        syncHostElementWidth: true,
        maxHeight: this.edutrMaxHeight,
        animated: true,
        isScrollable: true,
        onOutsidePointerEvent: this.onOutsideOverlayPointerEvent.bind(this),
      });
    } else {
      this.contentCreator(this.overlayRef.getContentViewContainerRef());
      setTimeout(() => {
        this.overlayRef?.updatePosition();
      });
    }
  }

  private closeOverlay() {
    if (this.overlayRef) {
      this.overlayRef
        .afterClosed()
        .pipe(take(1))
        .subscribe(() => {
          this.optionsContainerViewRef?.destroy();
          this.optionsContainerViewRef = undefined;
        });
      this.overlayRef.close();
      this.overlayRef = undefined;
    }
  }

  private contentCreator(viewContainerRef: ViewContainerRef) {
    if (!this.optionsContainerViewRef) {
      this.optionsContainerViewRef = viewContainerRef.createEmbeddedView(
        this.optionsContainer
      );
    }
  }
}
