import { Component, Input, OnInit, ElementRef, ViewChild, TemplateRef, Output, EventEmitter, ChangeDetectionStrategy, ContentChildren, QueryList } from '@angular/core';
import { contains, stopDefault, stopBubble } from '../util/util';
import { Trigger } from '../trigger/';

type Direction = 'top' | 'right' | 'bottom' | 'left' |
    'bottomRight' | 'topRight' | 'bottomLeft' | 'topLeft' |
    'rightBottom' | 'leftBottom' | 'rightTop' | 'leftTop';
type Method = 'click' | 'hover' | 'focus';

@Component({
    selector: 'Tooltip',
    templateUrl: './tooltip.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Tooltip implements OnInit {
    @ViewChild(Trigger) Trigger: Trigger;
    @ViewChild('dom') dom: ElementRef;
    @Input() title: any = 'tooltip';
    @Input() content: any;
    @Input() opened = false;
    @Output() openedChange = new EventEmitter<boolean>();

    set open(x) {
        this.opened = x;
        this.openedChange.emit(this.opened)
    };
    get open() {
        return this.opened
    }
    @Input() placement: Direction = 'top';
    get placementClass() {
        return `ant-tooltip ant-tooltip-placement-${this.placement}`
    }
    focusClick = false;
    _trigger = 'hover';
    @Input()
    set trigger(x) {
        if (x == 'click') { this._trigger = x; this.focusClick = false; };
        if (x == 'hover') { this._trigger = x; this.focusClick = false; };
        if (x == 'focus') { this._trigger = 'click'; this.focusClick = true; };
    }

    @Input() className: string;


    ngOnInit() {

    }

    ngOnDestroy() {
        this.opened = false;
    }
}
