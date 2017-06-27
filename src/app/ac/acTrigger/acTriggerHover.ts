import {
    Directive, Component, Input, ElementRef, ComponentRef, TemplateRef, ViewContainerRef,
    Renderer, ComponentFactoryResolver, Injector, EmbeddedViewRef, ComponentFactory, ContentChild, HostListener,
    Output, EventEmitter, NgZone, ViewChild, OnInit
} from '@angular/core';
import { toBoolean, contains, stopDefault, stopBubble } from '../util/util';

type Method = 'click' | 'hover' | 'focus';
import { Trigger } from '../trigger/';

@Component({
    selector: '[acTriggerHover]',
    template: `<template #tip>
    <div  [nglInternalOutlet]="acTrigger" (mouseenter)="mouseenter($event)" (mouseleave)="mouseleave($event)">

            </div>
        </template>

        <div  [triggerTarget]="tip" placement="bottom" [open]="opened">
            <ng-content></ng-content>
        </div>`
})
export default class acTriggerClick implements OnInit {
    @Input('acTriggerHover') acTrigger: any
    @Input() placement = 'bottom';
    opened = false;

    @ViewChild(Trigger) Trigger: Trigger;

    constructor(private myElement: ElementRef) {

    }

    ngOnInit() {

    }

    timer: any = null;
    delay = 200;
    mouseenter() {
        if (this.timer != null) { clearTimeout(this.timer); }
    }
    mouseleave() {
        this.opened = false;
    }

    @HostListener('mouseenter')
    onMouseOver() {
        if (this.timer != null) { clearTimeout(this.timer); }
        this.opened = true;
    }

    @HostListener('mouseleave')
    onMouseOut() {
        if (this.timer != null) { clearTimeout(this.timer); }
        this.timer = setTimeout(() => {
            this.opened = false;
            //   this.Trigger.open=false;
        }, this.delay);
    }

};
