import { Component, Input, OnChanges, ElementRef, ViewChild, TemplateRef, Output, EventEmitter, ContentChildren, QueryList, HostBinding } from '@angular/core';
import { contains, stopDefault, stopBubble, toBoolean } from '../util/util';
var classnames = require('classnames');


export interface AutoSizeType {
    minRows?: number;
    maxRows?: number;
}


@Component({
    selector: 'Modal',
    templateUrl: `./modal.html`,
})
export class Modal implements OnChanges {
    _open = false;
    @Input()
    set open(x) {
        if (x) { this.openTime = Date.now(); }
        this._open = x;
    }
    get open() {
        return this._open;
    }
    @Input() title: string | TemplateRef<any> = 'modal';
    @Input() okText: string = 'ok';
    @Input() cancelText: string = 'cancel';
    @Input() maskClosable: boolean = true;
    @Input() width: string = '520';

    get modalStyle() {
        return {
            width: this.width + 'px',
            [`transform-origin`]: ' -248px 222px 0px'
        }
    }

    @Input() footer: string | TemplateRef<any>;

    // @ViewChild('textAreaRef') textAreaRef: ElementRef;

    @Output() openChange = new EventEmitter<boolean>();
    @Output() onOk = new EventEmitter<any>();
    @Output() onCancel = new EventEmitter<any>();

    openTime = Date.now();

    maskClose(e) {
        if (Date.now() - this.openTime < 300) {
            return;
        }
        if (e.target === e.currentTarget && this.maskClosable) {
            this.openChange.emit(false);
        }
    }

    close() {
        this.openChange.emit(false);
    }
    cancel(e) {
        this.onCancel.emit(e)
    }
    ok(e) {
        this.onOk.emit(e)
    }

    @Input() className: string;


    ngOnChanges(changes: any) {

    }

    ngOnDestroy() {

    }
}
