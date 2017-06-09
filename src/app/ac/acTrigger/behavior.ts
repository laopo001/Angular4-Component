import {Directive, HostListener, HostBinding} from '@angular/core';
import acTrigger from './acTrigger';

@Directive({
  selector: '[nglPopover][nglPopoverBehavior]',
})
export class NglPopoverBehavior {

  @HostBinding('attr.tabindex') tabindex = 0;

  constructor(private trigger: acTrigger) {}

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