import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, Renderer, HostListener, HostBinding, NgZone } from '@angular/core';
import { replaceClass, toBoolean, uniqueId } from '../util/util';

export type Direction = 'top' | 'right' | 'bottom' | 'left';

@Component({
  selector: 'ac-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>
  `,

})
export class NglPopover {

  @Output() afterViewInit = new EventEmitter();

  //@Output() onInteraction = new EventEmitter<boolean>();



  // @Input() set theme(theme: any) {
  //   replaceClass(this, `slds-theme--${this._theme}`, theme ? `slds-theme--${theme}` : '');
  //   this._theme = theme;
  // }

  // @Input() set nglTooltip(isTooltip: any) {
  //   this.renderer.setElementClass(this.element.nativeElement, 'slds-popover--tooltip', toBoolean(isTooltip));
  // }

  // set nubbin(direction: Direction) {
  //   // replaceClass(this, `slds-nubbin--${this._nubbin}`, direction ? `slds-nubbin--${direction}` : '');
  //   this._nubbin = direction;
  // }

  uid = uniqueId('popover');

  @HostBinding('attr.aria-labelledby')
  get labelledby() {
    return `${this.uid}-heading`;
  }

  private _nubbin: Direction;
  private _theme: string;

  constructor(public element: ElementRef, public renderer: Renderer, public changeDetector: ChangeDetectorRef, public ngZone: NgZone) {
    // this.renderer.setElementClass(this.element.nativeElement, 'slds-popover', true);

    // Prevent position changes of "close by" elements
    this.renderer.setElementStyle(this.element.nativeElement, 'position', 'absolute');
    this.renderer.setElementAttribute(this.element.nativeElement, 'aria-describedby', this.uid);
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.renderer.setElementStyle(this.element.nativeElement, 'visibility', 'visible');
      })
    })
  }

  ngAfterContentInit() {
    this.afterViewInit.emit();
  }

  @HostBinding('style.z-index') z = 10001;
  @HostBinding('style.visibility') show = 'hidden';
  // @HostListener('mouseenter', ['$event', 'true'])
  // @HostListener('mouseleave', ['$event', 'false'])
  // interactiveHandler(evt: Event, isEnter: boolean) {
  //   this.onInteraction.emit(isEnter);
  // }

}