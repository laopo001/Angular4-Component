import { Component, Input, OnChanges, ElementRef, ViewChild, TemplateRef, Output, EventEmitter, ContentChildren, QueryList, HostBinding } from '@angular/core';
import { contains, stopDefault, stopBubble, toBoolean } from '../util/util';
var classnames = require('classnames');
import calculateNodeHeight from './calculateNodeHeight';


@Component({
    selector: 'InputGroup',
    template: `<span class="ant-input-group ant-input-group-compact">
        <ng-content></ng-content>
    </span>`,
    styleUrls:[`inputgroup.scss`]
})
export class InputGroup implements OnChanges {
    @Input() placeholder: string;
    @Input() autosize: any = false;
    @Input() row: number = 1;
    @Output() onEnter = new EventEmitter<string>();
    @ViewChild('textAreaRef') textAreaRef: ElementRef;

    get InputGroupClass() {
        return {
            [`ant-input`]: true,
        }
    }





    @Output() valueChange = new EventEmitter<string>();

    _onEnter() {
        this.onEnter.emit(this._value);
    }

    _value = '';

    @Input()
    set value(x) {
        this._value = x;
        this.valueChange.emit(x);
        
    }
    get value() {
        return this._value;
    }
    @Input() className: string;


    ngOnChanges(changes: any) {

    }

    ngOnDestroy() {

    }
}
