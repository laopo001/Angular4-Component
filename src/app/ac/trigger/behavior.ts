import {Directive, HostListener, HostBinding} from '@angular/core';
import Trigger from './trigger';

@Directive({
  selector: '[nglPopover][nglPopoverBehavior]',
})
export class NglPopoverBehavior {

  @HostBinding('attr.tabindex') tabindex = 0;

  constructor(private trigger: Trigger) {}

  @HostListener('mouseenter')
  @HostListener('focus')
  onMouseOver() {
    this.trigger.open = true;
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  onMouseOut() {
    this.trigger.open = false;
  }
};