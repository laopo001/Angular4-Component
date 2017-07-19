import { Component, Input, OnInit, ElementRef, ViewChild, TemplateRef, Output, EventEmitter, ContentChildren, QueryList } from '@angular/core';
import { contains, stopDefault, stopBubble } from '../util/util';
import { Trigger } from '../trigger/';

type Direction = 'top' | 'right' | 'bottom' | 'left' |
    'bottomRight' | 'topRight' | 'bottomLeft' | 'topLeft' |
    'rightBottom' | 'leftBottom' | 'rightTop' | 'leftTop';
type Method = 'click' | 'hover' | 'focus';

@Component({
    selector: 'Popconfirm',
    templateUrl: './popconfirm.html',
})
export  class Popconfirm implements OnInit {
    @ViewChild(Trigger) Trigger: Trigger;
    @ViewChild('dom') dom: ElementRef;
    @Input() title: any;
    @Input() okText: string;
    @Input() cancelText: string;
    @Input() opened = false;
    @Output() openedChange = new EventEmitter<boolean>();

    @Output() onConfirm = new EventEmitter<boolean>();
    @Output() onTrue = new EventEmitter<boolean>();
    @Output() onFalse = new EventEmitter<boolean>();
    click(b){
        this.onConfirm.emit(b);
        if(b){
            this.onTrue.emit(b)
        }else{
            this.onFalse.emit(b)
        }
        this.open=false;
    }
    set open(x) {
        this.opened = x;
        this.openedChange.emit(this.opened)
    };
    get open() {
        return this.opened
    }
    @Input() placement: Direction = 'bottom';
    get placementClass() {
        return `ant-popover ant-popover-placement-${this.placement}`
    }
    focusClick=false;
    _trigger='click';
    // @Input()
    // set trigger(x){
    //     if(x=='click'){this._trigger=x;this.focusClick=false;};
    //     if(x=='hover'){this._trigger=x;this.focusClick=false;};
    //     if(x=='focus'){this._trigger='click';this.focusClick=true;};
    // }

    @Input() className: string;


    ngOnInit() {

    }

    ngOnDestroy() {
        this.opened = false;
    }
}
