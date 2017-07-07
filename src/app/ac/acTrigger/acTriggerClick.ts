import {
  Directive, Component, Input, ElementRef, ComponentRef, TemplateRef, ViewContainerRef,
  Renderer, ComponentFactoryResolver, Injector, EmbeddedViewRef, ComponentFactory, ContentChild, HostListener,
  Output, EventEmitter, NgZone, ViewChild, OnInit
} from '@angular/core';
import { toBoolean, contains, stopDefault, stopBubble } from '../util/util';

type Method = 'click' | 'hover' | 'focus';
import { Trigger } from '../trigger/';

@Component({
  selector: '[acTriggerClick]',
  template: `<template #tip>
    <div (click)="stopBubble($event)"  [nglInternalOutlet]="acTrigger">

    </div>
</template>

<div  [triggerTarget]="tip" [placement]="placement" [open]="opened">
    <ng-content></ng-content>
</div>`
})
export default class acTriggerClick implements OnInit {
  @Input('acTriggerClick') acTrigger: any
  @Input() placement = 'bottom';

  _focus = false;
  @Input()
  set focus(x) {
    this._focus = toBoolean(x);
  }
  get focus() {
    return this._focus;
  }
  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @ViewChild(Trigger) Trigger: Trigger;
  @HostListener('click')
  handClick(e: any) {
    //stopBubble(e);
    this.opened = !this.opened;
    this.openedChange.emit(this.opened)
  }
  constructor(private myElement: ElementRef) {

  }
  close(e: any) {
    if (this.opened == false) { return; }
    var target = e.target || e.srcElement;
    if (contains(this.myElement.nativeElement, target)) {


    } else {
      this.opened = false;
      this.Trigger.open = false;
      this.openedChange.emit(this.opened)
    }
  }
  ngOnInit() {
    document.body.addEventListener('click', this.close.bind(this), false)
  }

  stopBubble(e: any) {
    if (this.focus) {
      return;
    }
    stopBubble(e);
  }
};
