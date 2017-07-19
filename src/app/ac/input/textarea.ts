import { Component, Input, OnChanges, ElementRef, ViewChild, TemplateRef, Output, EventEmitter, ContentChildren, QueryList, HostBinding } from '@angular/core';
import { contains, stopDefault, stopBubble, toBoolean } from '../util/util';
var classnames = require('classnames');
import calculateNodeHeight from './calculateNodeHeight';

export interface AutoSizeType {
    minRows?: number;
    maxRows?: number;
}


@Component({
    selector: 'acTextArea',
    template: `<textarea #textAreaRef [(ngModel)]="_value" [ngStyle]="textareaStyles" [ngClass]="inputClass" placeholder={{placeholder}}>{{value}}</textarea>
    `,
})
export class acTextArea implements OnChanges {
    @Input() placeholder: string;
    @Input() autosize: any = false;
    @Input() row: number = 1;
    @Output() onEnter = new EventEmitter<string>();
    @ViewChild('textAreaRef') textAreaRef: ElementRef;

    get inputClass() {
        return {
            [`ant-input`]: true,
        }
    }


    get textareaStyles() {
        const { autosize } = this;
        if (autosize || autosize === '') {
            const minRows = autosize ? (autosize as AutoSizeType).minRows : null;
            const maxRows = autosize ? (autosize as AutoSizeType).maxRows : null;
            const textareaStyles = calculateNodeHeight(this.textAreaRef.nativeElement, false, minRows, maxRows);
            // console.log(autosize, textareaStyles, textareaStyles.height > 28 ? textareaStyles.height : 28)

            return {
                height: (textareaStyles.height > 28 ? textareaStyles.height : 28) + 'px',
                [`min-height`]: textareaStyles.minHeight + 'px',
                [`max-height`]: textareaStyles.maxHeight + 'px',
                [`overflow-y`]: textareaStyles.overflowY
            };

        } else {
            return { height: ((this.row * 21) > 28 ? (this.row * 21) : 28) + 'px' }
        }

    }


    @Output() valueChange = new EventEmitter<string>();

    _onEnter() {
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
    


    @Input() className: string;


    ngOnChanges(changes: any) {

    }

    ngOnDestroy() {

    }
}
