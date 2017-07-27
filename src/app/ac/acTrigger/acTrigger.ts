import {
  Directive, Component, Input, ElementRef, ComponentRef, TemplateRef, ViewContainerRef,
  Renderer, ComponentFactoryResolver, Injector, EmbeddedViewRef, ComponentFactory, ContentChild, HostListener,
  Output, EventEmitter, NgZone, ViewChild, OnInit, ChangeDetectionStrategy
} from '@angular/core';
import { toBoolean, contains, stopDefault, stopBubble } from '../util/util';

type Method = 'click' | 'hover' | 'focus';
import { Trigger } from '../trigger/';

@Component({
  selector: '[acTrigger]',
  templateUrl: '/acTrigger.html',
})
export default class acTrigger implements OnInit {
  @Input('acTrigger') acTrigger: any
  @Input() placement = 'bottom';
  @Input() trigger: Method = 'click';
  _focus = false;
  @Input()
  set focusClick(x) {
    this._focus = toBoolean(x);
  }
  get focusClick() {
    return this._focus;
  }
  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();

  @ViewChild(Trigger) Trigger: Trigger;
  @HostListener('click')
  handClick(e: any) {
    if (this.trigger == 'click') {
      //stopBubble(e);
      this.opened = !this.opened;
      this.openedChange.emit(this.opened)
    }
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
    if (this.trigger == 'click') {
      document.body.addEventListener('click', this.close.bind(this), false)
    }


  }

  stopBubble(e: any) {
    if (this.trigger == 'click') {
      if (this.focusClick) {
        return;
      }
      stopBubble(e);
    }
  }
  //focus
  @HostListener('focus')
  focus() {
    if (this.trigger == 'focus') {
      this.opened = true;
    }
  }

  @HostListener('blur')
  blur() {
    if (this.trigger == 'focus') {
      this.opened = false;
    }
  }
  //hover
  timer: any = null;
  delay = 200;
  mouseenter() {
    if (this.trigger == 'hover') {
      if (this.timer != null) { clearTimeout(this.timer); }
    }
  }
  mouseleave() {
    if (this.trigger == 'hover') {
      this.opened = false;
      this.openedChange.emit(this.opened)
    }
  }

  @HostListener('mouseenter')
  onMouseOver() {
    if (this.trigger == 'hover') {
      if (this.timer != null) { clearTimeout(this.timer); }
      this.opened = true;
      this.openedChange.emit(this.opened)
    }
  }

  @HostListener('mouseleave')
  onMouseOut() {
    if (this.trigger == 'hover') {
      if (this.timer != null) { clearTimeout(this.timer); }
      this.timer = setTimeout(() => {
        this.opened = false;
        this.openedChange.emit(this.opened)
        //   this.Trigger.open=false;
      }, this.delay);
    }
  }
};
