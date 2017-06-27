import {
  Directive, Component, Input, ElementRef, ComponentRef, TemplateRef, ViewContainerRef,
  Renderer, ComponentFactoryResolver, Injector, EmbeddedViewRef, ComponentFactory, ContentChild, HostListener,
  Output, EventEmitter, NgZone, ViewChild, OnInit
} from '@angular/core';
import { toBoolean, contains, stopDefault, stopBubble } from '../util/util';

type Method = 'click' | 'hover' | 'focus';
import { Trigger } from '../trigger/';

@Component({
  selector: '[acTrigger]',
  templateUrl: '/acTrigger.html'
})
export default class acTrigger implements OnInit {
  @Input('acTrigger') acTrigger: any
  @Input() placement = 'bottom';
  opened = false;
  @ViewChild(Trigger) Trigger: Trigger;
  @HostListener('click')
  handClick(e: any) {
    this.opened = !this.opened;
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
    }
  }
  ngOnInit() {
    document.body.addEventListener('click', this.close.bind(this), false)
  } 
  stopBubble(e: any) {
    stopBubble(e);
  }
};
