import { Component, Input, OnInit, ElementRef, ViewChild, TemplateRef, Output, EventEmitter, ContentChildren, QueryList } from '@angular/core';
import { contains, stopDefault, stopBubble,toWidth,toBoolean } from '../util/util';



@Component({
    selector: 'acInput',
    templateUrl: './input.html',
})
export  class acInput implements OnInit {
    toBoolean=toBoolean;
    @Input() placeholder: string;
    @Input() size: string;
    @Input() addonBefore: string|TemplateRef<any>;
    @Input() addonAfter: string|TemplateRef<any>;
    @Input() prefix: string|TemplateRef<any>;
    @Input() suffix: string|TemplateRef<any>;


    @Input() disabled: any=false;


    @Input() width: any;
    get Tstyle(){
        return {
            width:toWidth(this.width)
        }
    }
    @Input() style: any;
    @Input() className: string;
    get inputClass(){
        return {
            [`ant-input`]:true,
            [`ant-input-lg`]:this.size==='large',
            [`ant-input-sm`]:this.size==='small',
            [`${this.className}`]:!!this.className
        }
    }

    @Output() valueChange= new EventEmitter<string>();
    @Output() onEnter= new EventEmitter<string>();
    _onEnter(){
        this.onEnter.emit(this._value);
    }
    
    __value='';
    set _value(x){
        this.__value=x;
        this.valueChange.emit(x);
    }
    get _value(){
        return this.__value;
    }

    @Input()
    set value(x){
        this.__value=x;
      //  this.valueChange.emit(x);
    }
    get value(){
        return this.__value;
    }
    


    ngOnInit() {
    }

    ngOnDestroy() {

    }
}
