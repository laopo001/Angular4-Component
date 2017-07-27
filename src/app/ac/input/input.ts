import { Component, Input, OnInit, ElementRef, ViewChild, TemplateRef, Output, EventEmitter, ContentChildren, QueryList, ChangeDetectionStrategy } from '@angular/core';
import { contains, stopDefault, stopBubble, toWidth, toBoolean, format, toInt } from '../util/util';

var throttle = require('lodash.throttle');
var debounce = require('lodash.debounce');
var classnames = require('classnames');


@Component({
    selector: 'acInput',
    templateUrl: './input.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class acInput implements OnInit {

    toBoolean = toBoolean;
    @Input() placeholder: string;
    @Input() size: string = 'middle';
    @Input() addonBefore: string | TemplateRef<any>;
    @Input() addonAfter: string | TemplateRef<any>;
    @Input() prefix: string | TemplateRef<any>;
    @Input() suffix: string | TemplateRef<any>;


    @Input() @format(toBoolean) disabled: any = false;


    @Input() width: any;
    get Tstyle() {
        return {
            width: toWidth(this.width)
        }
    }
    @Input() @format(toInt) time: number = 1000;
    @Input() option: any = { 'leading': false, 'trailing': true };
    @Input() type: any = 'text';
    @Input() style: any;
    @Input() className: string;
    get inputClass() {
        return classnames({
            [`ant-input`]: true,
            [`ant-input-lg`]: this.size === 'large',
            [`ant-input-sm`]: this.size === 'small',
            [`${this.className}`]: !!this.className
        })
    }
    @Output() throttleChange = new EventEmitter<string>();
    @Output() debounceChange = new EventEmitter<string>();
    @Output() valueChange = new EventEmitter<string>();
    @Output() onEnter = new EventEmitter<string>();
    _onEnter() {
        this.onEnter.emit(this._value);
    }

    __value = '';
    set _value(x) {
        if (x === this.__value) { return };
        this.__value = x;
        this.valueChange.emit(x);
        this.throttleFun();
        this.debounceFun();
    }
    get _value() {
        return this.__value;
    }
    throttleFun() {
        this.throttleChange.emit(this.__value);
    }
    debounceFun() {

        this.debounceChange.emit(this.__value);
    }
    constructor() {
        this.throttleFun = throttle(this.throttleFun, this.time, this.option)
        this.debounceFun = debounce(this.debounceFun, this.time, this.option)
    }
    @Input()
    set value(x) {
        this.__value = x;
    }
    get value() {
        return this.__value;
    }

    ngOnInit() {
    }

    ngOnDestroy() {

    }
}
