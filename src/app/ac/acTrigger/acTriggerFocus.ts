import {
    Directive, Component, Input, ElementRef, ComponentRef, TemplateRef, ViewContainerRef,
    Renderer, ComponentFactoryResolver, Injector, EmbeddedViewRef, ComponentFactory, ContentChild, HostListener,
    Output, EventEmitter, NgZone, ViewChild, OnInit
} from '@angular/core';
import { toBoolean, contains, stopDefault, stopBubble } from '../util/util';

type Method = 'click' | 'hover' | 'focus';
import { Trigger } from '../trigger/';

@Component({
    selector: '[acTriggerFocus]',
    template: `<template #tip>
    <div  [ngOut]="acTrigger" >

            </div>
        </template>

        <div  [triggerTarget]="tip" [placement]="placement" [open]="opened">
            <ng-content></ng-content>
        </div>`
})
export default class acTriggerFocus implements OnInit {
    @Input('acTriggerFocus') acTrigger: any
    @Input() placement = 'bottom';
    opened = false;

    @ViewChild(Trigger) Trigger: Trigger;

    constructor(private myElement: ElementRef) {

    }

    ngOnInit() {

    }



    @HostListener('focus')
    focus() {

        this.opened = true;
    }

    @HostListener('blur')
    blur() {

        this.opened = false;

    }

};
